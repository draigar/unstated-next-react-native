import {isEmpty, getTimeStamp} from './utility';
import {useConsole} from '../hooks/useConsole';

export const LogEntries = (name, state, prevState, object) => {
  const {createGroup, endGroup, logMsg} = useConsole();
  const timestamp = getTimeStamp();

  const {added, updated, deleted} = object;

  createGroup(`${name} ${timestamp}`);

  if (!isEmpty(added)) {
    logMsg('Added\n ', added);
  }

  if (!isEmpty(updated)) {
    logMsg('Updated\n ', updated);
  }

  if (!isEmpty(deleted)) {
    logMsg('Deleted\n ', deleted);
  }

  if (added || updated || deleted) {
    logMsg('New state\n ', state);
    logMsg('Old state\n ', prevState);
  }

  endGroup();
};
