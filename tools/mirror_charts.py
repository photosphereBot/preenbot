import os

<<<<<<< HEAD
def replicate_src_structure_with_md_files(src_directory, md_directory):
    """
    Replicate the structure of the source directory (src_directory) into the markdown directory (md_directory),
    including creating empty markdown files corresponding to the source files with a '.md' suffix.
    """
    for root, dirs, files in os.walk(src_directory):
        # Calculate the relative path from the source directory
        relative_path = os.path.relpath(root, src_directory)

        # Create corresponding directories in the markdown directory
        md_path = os.path.join(md_directory, relative_path)
        os.makedirs(md_path, exist_ok=True)

        # Create empty markdown files in the markdown directory corresponding to the source files
        for file in files:
            if file.endswith('.js'):  # Assuming you want to create .md files for each .js file
                md_file_name = f"{os.path.splitext(file)[0]}.md"
                md_file_path = os.path.join(md_path, md_file_name)
                open(md_file_path, 'a').close()  # Create an empty markdown file

# Specify the source and markdown directories
src_directory = 'src/'
md_directory = 'docs/charts/src/'

# Call the function to replicate the structure with .md files
replicate_src_structure_with_md_files(src_directory, md_directory)

print(f"The structure of '{src_directory}' has been replicated in '{md_directory}', with '.md' files for FlowCharts.")
=======
# Chemins à ignorer lors du listing du répertoire
ignored_paths = [
    'node_modules',
    'build',
    'test',
    'dist',
    '.git',
    '.vscode',
    '.scannerwork',
    # Ajoutez d'autres dossiers ou fichiers que vous souhaitez ignorer
]

def should_ignore(path, root_dir):
    """
    Vérifie si le chemin donné doit être ignoré.
    """
    relative_path = os.path.relpath(path, root_dir)
    for ignored in ignored_paths:
        if relative_path.startswith(ignored):
            return True
    return False

def create_md_files_and_list_directory(dir_path, md_directory, prefix='', root_dir=None):
    """
    Crée des fichiers Markdown pour chaque fichier et sous-dossier dans un répertoire, 
    tout en listant son contenu de manière récursive, en ignorant les chemins spécifiés.
    """
    if root_dir is None:
        root_dir = dir_path

    summary_entries = ''
    for item in os.listdir(dir_path):
        full_path = os.path.join(dir_path, item)
        if should_ignore(full_path, root_dir):
            continue

        md_path = os.path.join(md_directory, os.path.relpath(full_path, root_dir))
        if os.path.isdir(full_path):
            if not os.path.exists(md_path):
                os.makedirs(md_path, exist_ok=True)
            summary_entries += f"{prefix}* [{item}/]({md_path}/)\n"
            summary_entries += create_md_files_and_list_directory(full_path, md_directory, prefix + '    ', root_dir)
        else:
            md_file_path = f"{md_path}.md"
            if not os.path.exists(md_file_path):
                open(md_file_path, 'a').close()
            summary_entries += f"{prefix}* [{item}]({md_file_path})\n"

    return summary_entries

def append_summary_to_file(directory, md_directory, summary_file):
    """
    Ajoute la liste du répertoire à la fin du fichier SUMMARY.md existant.
    """
    summary_content = create_md_files_and_list_directory(directory, md_directory)
    with open(summary_file, 'a') as file:
        file.write("\n## Project Charts\n\n")
        file.write(summary_content)

src_directory = 'src/'
md_directory = 'docs/charts/'
summary_file = 'docs/SUMMARY.md'

append_summary_to_file(src_directory, md_directory, summary_file)

print(f"Structure de '{src_directory}' répliquée en fichiers .md dans '{md_directory}'.")
print(f"'SUMMARY.md' mis à jour avec des liens et une indentation.")
>>>>>>> dev
