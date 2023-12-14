this.setOrigin(0, this.startPos!, 0);
let openGrp;

const grpId = "door" + uuidv4();
{
	let p = this.add160_DoorLeft(0, 0, -this.sidePanelThickness,
	this.width, this.frontHeight, this.sidePanelThickness);

	openGrp = this.createOpenGroup(this._id, p);
    openGrp.openMatrix = new Matrix4().makeRotationY(120);
	
	p.extrude(`<svg width="${this.width}" height="${this.frontHeight}">` + `<rect x="0" y="0" rx="100" ry="100" width="${this.width}" height="${this.frontHeight}" />` + "</svg>", "z");

	var grp = this.createPartGroup(grpId, p);

	this.assignPartGroup("corpus", p);  // Move the door group *below* the corpus
}
{
	let p = this.add999_ScharnierL(this.sidePanelThickness, this.frontHeight / 4, 0,
	  100, 35, 15);
	this.assignPartGroup(grpId, p);
	this.assignOpenGroup(this._id, p);
}
{
	let p = this.add999_ScharnierL(this.sidePanelThickness, this.frontHeight / 4 + (2 * (this.frontHeight / 4)), 0,
	  100, 35, 15);
	this.assignPartGroup(grpId, p);
	this.assignOpenGroup(this._id, p);
}
{
  let referenceLength = this.width;
  if (this.handleOrientation === "Ver") {
    referenceLength = this.frontHeight;
  }

  let handleWidth = referenceLength * 0.3;
  let handleHeight = 10;
  let handleDepth = 10;
  let handlePosX = (referenceLength - handleWidth) / 2;
  let handlePosY = this.startPos + this.handleOffset;
  let p = this.addhandle_01(handlePosX, this.handleOffset, -(this.sidePanelThickness + handleDepth), handleWidth, handleHeight , handleDepth);
  openGrp.addPart(p);

  if (this.handleOrientation === "Ver") {
    let rotMatrix = new Matrix4();
    rotMatrix.multiply(new Matrix4().makeRotationZ(90)); // rotation 90° (x,y) => (y,-x)
    rotMatrix.multiply(new Matrix4().makeBasis(1, -1, 1)); // mirror at y-axis (y,-x) => (y,x)
    rotMatrix.multiply(new Matrix4().setPosition(this.startPos, this.width - handlePosY - this.handleOffset, 0)); // reposition the handle
	  p.setMatrix(rotMatrix);
  }

  this.assignPartGroup(grpId, p);
}