const defusalPrompts = {
    easy: [
      {
        prompt:
          "The red wire is clearly frayed and detached. The green connects to the charge, blue to the timer.",
        correct: "green",
      },
      {
        prompt:
          "Only the green wire is taped to the detonator. The others just hang loosely.",
        correct: "green",
      },
      {
        prompt:
          "The blue wire is blinking, and seems to power the countdown. The red wire is decorative.",
        correct: "blue",
      },
    ],
    medium: [
      {
        prompt:
          "Red and blue are both tightly wound, but the green wire runs along the detonation line.",
        correct: "green",
      },
      {
        prompt:
          "The red wire crosses the battery pack. The green wire is dusty. The blue wire disappears into the casing.",
        correct: "blue",
      },
      {
        prompt:
          "Green looks newer. Blue is worn. Red has residue from past cuts... Suspicious.",
        correct: "red",
      },
    ],
    hard: [
      {
        prompt:
          "All wires are identical... except the green one hums faintly when touched.",
        correct: "green",
      },
      {
        prompt:
          "You're told the detonator is old-school. Red and green match the manual, blue is undocumented.",
        correct: "blue",
      },
      {
        prompt:
          "You recall hearing: 'Avoid the one linked to the timer' — and that's definitely the blue wire.",
        correct: "red",
      },
    ],
  };
  
  export default defusalPrompts;
  