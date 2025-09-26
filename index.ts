import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function main() {
  const rl = createInterface({
    input,
    output,
  });

  try {
    const answer = await rl.question('Name? ');
    console.log('Hello ' + answer);
  } finally {
    rl.close();
  }
}

main();
