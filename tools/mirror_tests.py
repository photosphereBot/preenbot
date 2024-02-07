import os

def replicate_src_structure_in_tests_with_test_suffix(src_directory, test_directory):
    """
    Replicate the structure of the source directory (src_directory) into the test directory (test_directory),
    including creating empty test files corresponding to the source files with a '.test.js' suffix.
    """
    for root, dirs, files in os.walk(src_directory):
        # Calculate the relative path from the source directory
        relative_path = os.path.relpath(root, src_directory)

        # Create corresponding directories in the test directory
        test_path = os.path.join(test_directory, relative_path)
        os.makedirs(test_path, exist_ok=True)

        # Create empty test files in the test directory corresponding to the source files
        for file in files:
            if file.endswith('.js'):
                test_file_name = f"{os.path.splitext(file)[0]}.test.js"
                test_file_path = os.path.join(test_path, test_file_name)
                open(test_file_path, 'a').close()  # Create an empty test file

# Specify the source and test directories
src_directory = 'src/'
test_directory = 'test/'

# Call the function to replicate the structure with test file suffix
replicate_src_structure_in_tests_with_test_suffix(src_directory, test_directory)

print(f"The structure of '{src_directory}' has been replicated in '{test_directory}', with '.test.js' suffix for test files.")
