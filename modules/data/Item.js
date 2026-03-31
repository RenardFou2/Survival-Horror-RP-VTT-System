const { HTMLField, NumberField, SchemaField, StringField } = foundry.data.fields;

/* -------------------------------------------- */
/*  Item Models                                */
/* -------------------------------------------- */

export class ItemDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField({initial: ""}),
      width: new fields.NumberField({initial: 1, min: 1, max: 2, integer: true}),
      height: new fields.NumberField({initial: 1, min: 1, max: 2, integer: true}),
      gridX: new fields.NumberField({initial: 0, integer: true}),
      gridY: new fields.NumberField({initial: 0, integer: true}),
    };
  }
}

export class WeaponDataModel extends ItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();
    
    return {
      ...baseSchema,
      ammo: new fields.SchemaField({
        value: new fields.NumberField({initial: 15, min: 0, integer: true}),
        max: new fields.NumberField({initial: 15, integer: true}),
        type: new fields.StringField({initial: "9mm"})
      }),
      damage: new fields.StringField({initial: "1d6"}),
      fireRate: new fields.NumberField({initial: 1})
    };
  }
}

export class ConsumableDataModel extends ItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      healingAmount: new fields.NumberField({initial: 25}),
      isCurePoison: new fields.BooleanField({initial: false})
    };
  }
}