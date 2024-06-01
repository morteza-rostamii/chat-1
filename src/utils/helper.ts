import {v4 as uuidv4} from 'uuid'

const helper = {

  // generate random id
  getRandomId() {
    return uuidv4();
  },

  truncateText(text: string, maxLength: number): string {
    /**
     * Truncates text to a certain number of characters.
     * 
     * @param text The text to be truncated.
     * @param maxLength The maximum number of characters allowed.
     * @returns The truncated text.
     */
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength) + '...';
    }
  },
  
};

export default helper;