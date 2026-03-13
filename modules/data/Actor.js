const { HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

/* -------------------------------------------- */
/*  Actor Models                                */
/* -------------------------------------------- */

class ActorDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      resources: new SchemaField({
        health: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField({ required: true, integer: true, initial: 10 })
        })
      }),
      speed: new SchemaField({
        value: new NumberField(),
        max: new NumberField()
      }),
      attribute: new SchemaField({
        firearms: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField()
        }),
        closecombat: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField()
        }),
        strength: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField()
        }),
        agility: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField()
        }),
        healing: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField()
        }),
        awarstea: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField()
        }),
        survival: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField()
        }),
        comauth: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField()
        }),
        persemp: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField()
        }),
        systems: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField()
        }),
        knowledge: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField()
        }),
      })
    };
  }
  prepareDerivedData() {
    super.prepareDerivedData();
    
    //Clamps health so it cannot go above max
    const { health } = this.resources;
    health.value = Math.min(health.value, health.max);

    //Calculates attribute modifiers
    for (const attr of Object.values(this.attribute)) {
      attr.mod = Math.floor((attr.value - 10) / 2);
    }
  }
}

export class HumanDataModel extends ActorDataModel {
  static defineSchema(){
    return{
      ...super.defineSchema(),
      inventorySize: new SchemaField({
          min: new NumberField({ required: true, integer: true, min: 1}),
          value: new NumberField({ required: true, integer: true, min: 1, initial: 1 }),
          max: new NumberField({ required: true, integer: true, initial: 8 })
      }),
      level: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 30 })
    }
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    const { health } = this.resources;
    const percent = health.value / health.max;
    if (percent >= 0.75) {
      health.healthState = "Fine";
    } 
    else if (percent >= 0.5) {
      health.healthState = "Caution (Yellow)";
    } 
    else if (percent >= 0.35) {
      health.healthState = "Caution (Orange)";
    } 
    else {
      health.healthState = "Danger";
    }
    console.log(health);
  }
}

export class EnemyDataModel extends ActorDataModel {
  static defineSchema(){
    return{
      ...super.defineSchema()
    }
  }
}