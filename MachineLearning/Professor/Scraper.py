import requests
from bs4 import BeautifulSoup
import sys
import json

# Step 1: Load professor links from the extracted_professor_links.txt file
with open('extracted_professor_links.txt', 'r', encoding='utf-8') as file:
    professor_links = file.readlines()

# Step 2: Iterate over each professor link
base_url = "https://www.ratemyprofessors.com"  # Modify this to match the base URL of the professor pages
for professor_link in professor_links:
    professor_link = professor_link.strip()  # Remove any trailing whitespace
    url = f"{base_url}{professor_link}"

    try:
        # Step 3: Send a GET request to the professor's webpage
        response = requests.get(url)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract professor details
            name_div = soup.find('div', class_='NameTitle__Name-dowf0z-0')
            name = None
            if name_div:
                first_name_span = name_div.find('span')
                last_name_span = name_div.find('span', class_='NameTitle__LastNameWrapper-dowf0z-2')
                if first_name_span and last_name_span:
                    first_name = first_name_span.text.strip()
                    last_name = last_name_span.contents[0].strip() if last_name_span.contents else ''
                    name = f"{first_name} {last_name}"

            rating_div = soup.find('div', class_='RatingValue__AvgRatingWrapper-qw8sqy-3')
            rating = None  # Default to None if no valid rating found
            if rating_div:
                numerator = rating_div.find('div', class_='RatingValue__Numerator-qw8sqy-2')
                if numerator:
                    rating_text = numerator.text.strip()
                    # Check if rating is a valid number
                    try:
                        rating = float(rating_text)
                    except ValueError:
                        # Handle cases where rating is not a valid number (like 'N/A')
                        rating = None
                        print(f"Invalid rating value for {name}: {rating_text}, setting rating to None.")

            department_link = soup.find('a', class_='TeacherDepartment__StyledDepartmentLink-fl79e8-0')
            department = department_link.text.strip() if department_link else None

            comments_divs = soup.find_all('div', class_='Comments__StyledComments-dzzyvm-0')

            # Step 4: Replace empty comments with "N/A"
            comments = [{"text": comment.text.strip() if comment.text.strip() else "N/A", 
                         "pos": None, 
                         "neu": None, 
                         "neg": None} for comment in comments_divs]

            # Step 5: Prepare the data to send to Node.js API
            professor_data = {
                "professor_name": name,
                "rating": rating,
                "department": department,
                "comments": comments
            }

            # Step 6: Send the data to your Node.js server via a POST request
            api_url = 'http://localhost:5000/api/professors'  # Ensure the URL matches your Node.js endpoint
            headers = {'Content-Type': 'application/json'}
            response = requests.post(api_url, json=professor_data, headers=headers)

            if response.status_code == 201:
                print(f"Professor data for {name} successfully stored!")
            else:
                print(f"Failed to store professor data for {name}. Status code: {response.status_code}")
        else:
            print(f"Failed to retrieve the page for {professor_link}. Status code: {response.status_code}")

    except Exception as e:
        print(f"An error occurred while processing {url}: {e}")
