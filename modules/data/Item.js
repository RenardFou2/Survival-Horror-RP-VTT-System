import { systemPath } from "../constants.js";

/* -------------------------------------------- */
/*  Item Models                                */
/* -------------------------------------------- */

export class ItemDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField({
        initial: "",
        label: "SYSTEM.Item.Description"
      }),
    };
  }
}

export class InventoryItemDataModel extends ItemDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      width: new fields.NumberField({initial: 1, min: 1, max: 2, integer: true, label: "SYSTEM.InventoryItem.Width"}),
      height: new fields.NumberField({initial: 1, min: 1, max: 2, integer: true, label: "SYSTEM.InventoryItem.Height"}),
      gridX: new fields.NumberField({initial: 0, integer: true, label: "SYSTEM.InventoryItem.GridX"}),
      gridY: new fields.NumberField({initial: 0, integer: true, label: "SYSTEM.InventoryItem.GridY"}),
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
        value: new fields.NumberField({initial: 15, min: 0, integer: true, label: "SYSTEM.Weapon.AmmoCount"}),
        magSize: new fields.NumberField({initial: 15, integer: true, label: "SYSTEM.Weapon.MagSize"}),
        ammoType: new fields.StringField({initial: "9mm", label: "SYSTEM.Weapon.AmmoType"})
      }),
      damage: new fields.SchemaField({
        dieNumber: new fields.NumberField({
          initial: 1, 
          min: 1, 
          integer: true, 
          label: game.i18n.localize("SYSTEM.Weapon.DieNumber")}),
        dieSize: new fields.NumberField({
          initial: 6, 
          integer: true, 
          label: "SYSTEM.Weapon.DieSize"})
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
        "9mm": game.i18n.localize("SYSTEM.Weapon.AmmoTypes.9mm"),
        "12g": game.i18n.localize("SYSTEM.Weapon.AmmoTypes.12g"),
        ".357": game.i18n.localize("SYSTEM.Weapon.AmmoTypes.357"),
        "bolt": game.i18n.localize("SYSTEM.Weapon.AmmoTypes.Bolt")
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
      healingAmount: new fields.NumberField({
        initial: 25, 
        label: "SYSTEM.Consumable.HealingAmount"}),

      isPoisonCure: new fields.BooleanField({
        initial: false, 
        label: "SYSTEM.Consumable.IsPoisonCure"})
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