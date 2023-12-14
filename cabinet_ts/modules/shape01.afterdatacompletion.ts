// Calculate the startPos

let startPos = 0;

this.m.forEach(cm =>  {
  if (cm instanceof OD_M_singleDoor) {
    cm.startPos = startPos;
    startPos += cm.frontHeight!;
  }

  if (cm instanceof OD_M_singleDrawer) {
    cm.startPos = startPos;
    startPos += cm.height!;
  }
});