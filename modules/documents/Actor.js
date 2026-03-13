
export class SystemActor extends Actor {
  async applyDamage(damage) {
    // Always take a minimum of 1 damage, and round to the nearest integer.
    damage = Math.round(Math.max(1, damage));

    // Update the health.
    const { value } = this.system.resources.health;
    await this.update({ "system.resources.health.value": value - damage });

    // Log a message.
    await ChatMessage.implementation.create({
      content: `${this.name} took ${damage} damage!`
    });
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    console.log("System data:", this);

    this.system.resources.health.value = Math.clamp(
      this.system.resources.health.value,
      this.system.resources.health.min ?? 0,
      this.system.resources.health.max
    );
  }
}