import re

# Step 1: Read the HTML content from your txt file
try:
    with open('htmlProf.txt', 'r', encoding='utf-8') as file:
        html_content = file.read()
    print("HTML content successfully loaded.")
except FileNotFoundError:
    print("Error: 'htmlProf.txt' not found. Make sure the file is in the correct location.")

# Step 2: Use a regular expression to find all href="/professor/XXXXXXX"
professor_links = re.findall(r'href="(/professor/\d+)"', html_content)
print(f"Found {len(professor_links)} professor links.")

# Step 3: Save the extracted links into a new txt file
if professor_links:
    with open('extracted_professor_links.txt', 'w', encoding='utf-8') as output_file:
        for link in professor_links:
            output_file.write(link + '\n')
    print(f"Extracted professor links saved to 'extracted_professor_links.txt'.")
else:
    print("No professor links found.")
