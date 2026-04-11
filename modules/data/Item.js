import { systemPath } from "../constants.js";

/* -------------------------------------------- */
/*  Item Models                                */
/* -------------------------------------------- */

export class ItemDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField({initial: ""}),
    };
  }
}

export class InventoryItemDataModel extends ItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      width: new fields.NumberField({initial: 1, min: 1, max: 2, integer: true}),
      height: new fields.NumberField({initial: 1, min: 1, max: 2, integer: true}),
      gridX: new fields.NumberField({initial: 0, integer: true}),
      gridY: new fields.NumberField({initial: 0, integer: true}),
    };
  }
}

export class WeaponDataModel extends InventoryItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      ammo: new fields.SchemaField({
        value: new fields.NumberField({initial: 15, min: 0, integer: true, label: "Ammo count"}),
        magSize: new fields.NumberField({initial: 15, integer: true, label: "Magazine size"}),
        ammoType: new fields.StringField({initial: "9mm", label: "Ammo Type"})
      }),
      damage: new fields.SchemaField({
        dieNumber: new fields.NumberField({initial: 1, min: 1, integer: true, label: "Dice Count"}),
        dieSize: new fields.NumberField({initial: 6, integer: true, label: "Die Size"})
      })
    };
  }

  static get metadata() {
    return {
      type: "weapon",
      detailsPartial: [systemPath("templates/item/partials/weapon.hbs")]
    };
  }

  async getSheetContext(context) {
    context.ammoTypes = {
        "9mm": "9mm Parabellum",
        "12g": "12 Gauge Shells",
        ".357": ".357 Magnum",
        "bolt": "Crossbow Bolts"
    };
    
    context.dieSizes = {
      4: "d4",
      6: "d6",
      8: "d8",
      10: "d10",
      12: "d12"
    };
    return context;
  }
}

export class ConsumableDataModel extends InventoryItemDataModel {
  
  static defineSchema() {
    const fields = foundry.data.fields;
    const baseSchema = super.defineSchema();

    return {
      ...baseSchema,
      healingAmount: new fields.NumberField({initial: 25}),
      isCurePoison: new fields.BooleanField({initial: false})
    };
  }

  static get metadata() {
    return {
      type: "consumable",
      detailsPartial: [systemPath("templates/item/partials/consumable.hbs")]
    };
  }

  async getSheetContext(context) {
    return context;
  }
}