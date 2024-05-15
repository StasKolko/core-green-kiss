const rusToEngLayout: { [key: string]: string } = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: '"',
  ы: "y",
  ь: "'",
  э: "e",
  ю: "yu",
  я: "ya",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  " ": "-",
};

export function russianToEnglishLayout(russian: string): string {
  let english = "";

  for (const letter of russian) {
    const lowerCaseLetter = letter.toLowerCase();
    if (lowerCaseLetter in rusToEngLayout) {
      english = english.concat(rusToEngLayout[lowerCaseLetter]);
    } else {
      english = english.concat(lowerCaseLetter);
    }
  }

  return english;
}
