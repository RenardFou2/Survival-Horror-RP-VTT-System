const {api, sheets} = foundry.applications;
import { systemPath } from "../../constants.js";

/**
 * Extend the basic ItemSheetV2 with some system-specific features.
 * @extends {ItemSheet}
 */
export class SHRPItemSheet extends api.HandlebarsApplicationMixin(sheets.ItemSheetV2) {
    static DEFAULT_OPTIONS = {
        classes: ["resident-evil", "item-sheet"],
        tag: "form",
        window: { resizable: true, icon: "fas fa-biohazard" },
        form: { submitOnChange: true },
        position: { width: 450, height: "auto" },
    };

    static TABS = {
        primary: {
            tabs: [
                { id: "description", label: "Examine", icon: "fas fa-eye" },
                { id: "details", label: "Properties", icon: "fas fa-cog" }
            ],
            initial: "description"
        }
    };

    /** @inheritdoc */
    static PARTS = {
        header: { template: systemPath("templates/item/item-header.hbs")},
        tabs: { template: "templates/generic/tab-navigation.hbs"},
        description: { template: systemPath("templates/item/item-description.hbs")},
    };

    /** @inheritdoc */
    _configureRenderParts(options) {
        const parts = super._configureRenderParts(options);
        const itemModel = this.item.system.constructor;

        if (itemModel.metadata?.detailsPartial) {
            parts.details = { template: systemPath("templates/item/item-details.hbs") };
        }
        
        return parts;
    }

    /** @inheritdoc */
    async _preparePartContext(partId, context) {
        if (partId in context.tabs) context.tab = context.tabs[partId];

        switch (partId) {
            case "details":
                context.detailsPartial = this.item.system.constructor.metadata.detailsPartial ?? null;
                context.systemFields = this.item.system.schema.fields;
                await this.item.system.getSheetContext(context);
                break;
        }
        return context;
    }

    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.item = this.item;
        context.system = this.item.system;
        return context;
    }
}