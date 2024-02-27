import path from 'path';
import getAllFiles from './getAllFiles';

interface MessageComponent {
  name: string;
  // You can add more properties that are common to all your message components.
}

const loadMessageComponents = (exceptions: string[] = []): MessageComponent[] => {
  let messageComponents: MessageComponent[] = [];

  const messageComponentCategories = getAllFiles(
    path.join(__dirname, '..', 'messageComponents'),
    true
  );

  for (const messageComponentCategory of messageComponentCategories) {
    const messageComponentFiles = getAllFiles(messageComponentCategory);

    for (const messageComponentFile of messageComponentFiles) {
      // Assuming CommonJS modules, you might want to adapt this if using ES6 imports
      const messageComponentObject: MessageComponent = require(messageComponentFile);

      if (exceptions.includes(messageComponentObject.name)) {
        continue;
      }

      messageComponents.push(messageComponentObject);
    }
  }

  return messageComponents;
};

export default loadMessageComponents;
