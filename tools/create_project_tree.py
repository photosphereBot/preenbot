import os

# Paths to ignore during the directory listing
ignored_paths = [
    'node_modules',
    'build',
    'dist',
    'project-tree.txt',  # Do not include the output file itself
    '.git',
    '.vscode',
    '.scannerwork',
    # Add other folders or files you want to ignore
]

def should_ignore(path, root_dir):
    """
    Check if the given path should be ignored.
    """
    # Get the relative path from the root directory
    relative_path = os.path.relpath(path, root_dir)

    for ignored in ignored_paths:
        if relative_path.startswith(ignored):
            return True
    return False

def list_directory(dir_path, prefix='', root_dir=None):
    """
    List the contents of a directory, recursively, while ignoring specified paths, and format it as Markdown.
    """
    if root_dir is None:
        root_dir = dir_path

    dir_tree = ''
    try:
        for item in os.listdir(dir_path):
            full_path = os.path.join(dir_path, item)
            if should_ignore(full_path, root_dir):
                continue

            # Format for Markdown (using bullet points)
            if os.path.isdir(full_path):
                dir_tree += f"{prefix}- {item}/\n"
                dir_tree += list_directory(full_path, prefix + '    ', root_dir)
            else:
                dir_tree += f"{prefix}- {item}\n"
    except Exception as error:
        print(f'Error reading directory: {error}')

    return dir_tree

# Save the output in the ./docs directory with a .md extension

def save_tree_to_file(directory, file_path):
    """
    Save the directory tree of a given directory to a file.
    """
    project_tree = list_directory(directory)
    with open(file_path, 'w') as file:
        file.write(project_tree)

# Target the root directory and output to 'project-tree.txt'
save_tree_to_file('./', './docs/project_tree.md')
