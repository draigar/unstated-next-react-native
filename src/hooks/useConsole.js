export function useConsole() {
  const createGroup = console.group.bind(console);
  const endGroup = console.groupEnd.bind(console);
  const logMsg = console.log;
  return {
    createGroup,
    endGroup,
    logMsg
  };
}
