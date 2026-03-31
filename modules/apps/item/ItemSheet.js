const {api, sheets} = foundry.applications;
/**
 * Extend the basic ItemSheetV2 with some system-specific features.
 * @extends {ItemSheet}
 */
export class SHRPItemSheet extends api.HandlebarsApplicationMixin(sheets.ItemSheetV2) {
    static DEFAULT_OPTIONS = {
        classes: ["resident-evil", "item-sheet"],
        tag: "form",
        window: {
            resizable: true,
            icon: "fas fa-biohazard"
        },
        form: {
            submitOnChange: true
        },
        position: { width: 450, height: "auto" },
        actions: {
        // Define click functions here later
        }
    };

    static TABS = {
        primary: {
            tabs: [
                { id: "description", label: "Examine", icon: "fas fa-eye" },
                { id: "properties", label: "Properties", icon: "fas fa-cog" }
            ],
            initial: "description"
        }
    };
    /** @inheritdoc */
    static PARTS = {
        header: { template: "./systems/survival-horror-rp/templates/item/item-header.hbs"},
        tabs: { template: "templates/generic/tab-navigation.hbs" },
        description: { template: "./systems/survival-horror-rp/templates/item/item-description.hbs" },
        properties: { template: "./systems/survival-horror-rp/templates/item/item-properties.hbs" }
    };

    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.item = this.item;
        context.system = this.item.system;
        return context;
    }
}
