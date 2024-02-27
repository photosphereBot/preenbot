// Import statements in TypeScript
import path from 'path';
import getAllFiles from './getAllFiles';

// Define an interface for the modal objects, assuming they have a 'name' property at least.
interface Modal {
  name: string;
  // Add more properties based on the actual structure of your modal objects.
}

const loadModals = (exceptions: string[] = []): Modal[] => {
  let modals: Modal[] = [];

  const modalCategories = getAllFiles(
    path.join(__dirname, '..', 'modals'),
    true
  );

  for (const modalCategory of modalCategories) {
    const modalFiles = getAllFiles(modalCategory);

    for (const modalFile of modalFiles) {
      // Assuming the use of CommonJS modules, hence the use of require()
      const modalObject: Modal = require(modalFile);

      if (exceptions.includes(modalObject.name)) {
        continue;
      }

      modals.push(modalObject);
    }
  }

  return modals;
};

// Export the function using TypeScript's export syntax
export default loadModals;
