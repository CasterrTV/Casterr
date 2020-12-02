interface Number {
  toReadableTimeFromSeconds(): string;
}

Number.prototype.toReadableTimeFromSeconds = function (this: number): string {
  // Get days, hours, minutes and seconds from total seconds
  let d = Math.floor(this / (3600*24));
  let h = Math.floor(this % (3600*24) / 3600);
  let m = Math.floor(this % 3600 / 60);
  let s = Math.floor(this % 60);
  
  // Turn into readable format
  let dDisplay = d > 0 ? d + ":" : "";
  let hDisplay = h > 0 ? h + ":" : "";
  let mDisplay = m > 0 ? m + ":" : "";
  let sDisplay = s > 0 ? s + "" : "";

  // Return readable format
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
