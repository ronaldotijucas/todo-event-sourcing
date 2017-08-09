const expect = require('expect.js');
const CreateTask = require('./create-task');

function InMemoryStore(entries = []) {
  return {
    save: entry => entries.push(entry),
    eventNames: () => entries.map(e => e.name)
  };
}
const uuidGenerator = () => '1';

describe('Use Case - Create Task', () => {
  it('assigns a UUID to the new task', () => {
    const store = new InMemoryStore();
    const createTask = CreateTask({ store, uuidGenerator });
    const uuid = createTask({ description: 'Buy Milk' });

    expect(uuid).to.equal('1');
  });

  it('creates a new task', () => {
    const store = new InMemoryStore();
    const createTask = CreateTask({ store, uuidGenerator });
    createTask({ description: 'Buy Milk' });
    expect(store.eventNames()).to.eql(['TASK_CREATED']);
  });
});
