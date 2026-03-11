const { HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

/* -------------------------------------------- */
/*  Actor Models                                */
/* -------------------------------------------- */

class ActorDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      resources: new SchemaField({
        health: new SchemaField({
          min: new NumberField({ required: true, integer: true, min: 0 }),
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField({ required: true, integer: true, initial: 10 })
        })
      }),
      speed: new SchemaField({
        min: new NumberField({ required: true, integer: true, min: 0 }),
        value: new NumberField(),
        max: new NumberField()
      }),
      attribute: new SchemaField({
        firearms: new SchemaField({
          value: new NumberField(),
          max: new NumberField()
        }),
        closecombat: new SchemaField({
          value: new NumberField(),
          max: new NumberField()
        }),
        strength: new SchemaField({
          value: new NumberField(),
          max: new NumberField()
        }),
        agility: new SchemaField({
          value: new NumberField(),
          max: new NumberField()
        }),
        healing: new SchemaField({
          value: new NumberField(),
          max: new NumberField()
        }),
        awarstea: new SchemaField({
          value: new NumberField(),
          max: new NumberField()
        }),
        survival: new SchemaField({
          value: new NumberField(),
          max: new NumberField()
        }),
        comauth: new SchemaField({
          value: new NumberField(),
          max: new NumberField()
        }),
        persemp: new SchemaField({
          value: new NumberField(),
          max: new NumberField()
        }),
        systems: new SchemaField({
          value: new NumberField(),
          max: new NumberField()
        }),
        knowledge: new SchemaField({
          value: new NumberField(),
          max: new NumberField()
        }),
      })
    };
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

  static migrateData() {
  }
  prepareDerivedData() {
    super.prepareDerivedData();
  }
}

export class EnemyDataModel extends ActorDataModel {
  static defineSchema(){
    return{
      ...super.defineSchema()
    }
  }

  static migrateData() {
  }
  prepareDerivedData() {
    super.prepareDerivedData();
  }
}