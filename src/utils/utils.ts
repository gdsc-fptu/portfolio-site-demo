export function incEltNbr(elt: HTMLElement, value: number, speed: number = 10) {
  function incNbrRec(i: number, endNbr: number, elt: HTMLElement) {
    if (i <= endNbr) {
      elt.innerHTML = i.toString();
      setTimeout(function () {
        //Delay a bit before calling the function again.
        incNbrRec(i + 1, endNbr, elt);
      }, speed);
    }
  }
  incNbrRec(0, value, elt);
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
