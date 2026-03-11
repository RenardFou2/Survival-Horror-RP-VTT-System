
export class SystemItem extends Item {
  get isFree() {
    return this.price < 1;
  }
}