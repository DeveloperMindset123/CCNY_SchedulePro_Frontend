/// define a helper function to get the datatypes of variables
pub fn get_datatype<T>(_: &T) {
    println!("The datatype is : {}", std::any::type_name::<T>());
}
