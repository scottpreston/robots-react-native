function resolveSometime(cmd, dur) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cmd());
    }, dur);
  });
}

const command = function(funct, dur) {
  return { commandFunction: funct, duration: dur };
};

async function processCommands(cmds) {
  for (let cmd of cmds) {
    await resolveSometime(cmd.commandFunction, cmd.duration);
  }
}

processCommands([
  command(() => {
    console.log("hi there 1", new Date());
  }, 1000),
  command(() => {}, 1000), // do nothing
  command(() => {
    console.log("hi again 2", new Date());
  }, 1000)
]);
