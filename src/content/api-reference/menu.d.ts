import type { DataAttrSchema } from "@/types";
export declare const trigger: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
    };
    slotProps: {
        [x: string]: import("@/types").PropSchema;
    };
    dataAttributes: DataAttrSchema[];
};
export declare const content: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
        side: {
            type: {
                type: string;
                definition: string;
            };
            description: string;
        };
        sideOffset: {
            type: string;
            default: string;
            description: string;
        };
        align: {
            type: {
                type: string;
                definition: string;
            };
            description: string;
        };
        alignOffset: {
            type: string;
            default: string;
            description: string;
        };
        avoidCollisions: {
            type: string;
            default: string;
            description: string;
        };
        collisionBoundary: {
            type: {
                type: string;
                definition: string;
            };
            description: string;
        };
        collisionPadding: {
            type: string;
            default: string;
            description: string;
        };
        fitViewport: {
            type: string;
            default: string;
            description: string;
        };
        sameWidth: {
            type: string;
            default: string;
            description: string;
        };
        strategy: {
            type: {
                type: string;
                definition: string;
            };
            default: string;
            description: string;
        };
        overlap: {
            type: string;
            default: string;
            description: string;
        };
        transition: import("@/types").PropSchema;
        transitionConfig: import("@/types").PropSchema;
        inTransition: import("@/types").PropSchema;
        inTransitionConfig: import("@/types").PropSchema;
        outTransition: import("@/types").PropSchema;
        outTransitionConfig: import("@/types").PropSchema;
    };
    slotProps: {
        [x: string]: import("@/types").PropSchema;
    };
    dataAttributes: DataAttrSchema[];
};
export declare const arrow: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
        size: {
            type: string;
            default: string;
            description: string;
        };
    };
    slotProps: {
        [x: string]: import("@/types").PropSchema;
    };
    dataAttributes: DataAttrSchema[];
};
export declare const item: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
        disabled: {
            type: string;
            default: string;
            description: string;
        };
        href: {
            type: string;
            description: string;
        };
    };
    slotProps: {
        [x: string]: import("@/types").PropSchema;
    };
    dataAttributes: DataAttrSchema[];
};
export declare const group: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
    };
    slotProps: {
        [x: string]: import("@/types").PropSchema;
    };
    dataAttributes: DataAttrSchema[];
};
export declare const label: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
    };
    slotProps: {
        [x: string]: import("@/types").PropSchema;
    };
    dataAttributes: DataAttrSchema[];
};
export declare const separator: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
    };
    slotProps: {
        [x: string]: import("@/types").PropSchema;
    };
    dataAttributes: DataAttrSchema[];
};
export declare const checkboxIndicator: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
    };
    slotProps: {
        attrs: import("@/types").PropSchema;
        checked: {
            type: string;
            description: string;
        };
    };
    dataAttributes: DataAttrSchema[];
};
export declare const checkboxItem: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
        disabled: {
            type: string;
            default: string;
            description: string;
        };
        checked: {
            default: string;
            type: string;
            description: string;
        };
        onCheckedChange: {
            type: {
                type: string;
                definition: string;
            };
            description: string;
        };
    };
    slotProps: {
        [x: string]: import("@/types").PropSchema;
    };
    dataAttributes: DataAttrSchema[];
};
export declare const radioGroup: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
        value: {
            type: string;
            description: string;
        };
        onValueChange: {
            type: {
                type: string;
                definition: string;
            };
            description: string;
        };
    };
    slotProps: {
        [x: string]: import("@/types").PropSchema;
    };
    dataAttributes: DataAttrSchema[];
};
export declare const radioItem: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
        value: {
            type: string;
            description: string;
            required: true;
        };
        disabled: {
            type: string;
            description: string;
        };
    };
    slotProps: {
        [x: string]: import("@/types").PropSchema;
    };
    dataAttributes: DataAttrSchema[];
};
export declare const subTrigger: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
        disabled: {
            type: string;
            default: string;
            description: string;
        };
    };
    slotProps: {
        [x: string]: import("@/types").PropSchema;
    };
    dataAttributes: DataAttrSchema[];
};
export declare const subContent: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
        side: {
            type: {
                type: string;
                definition: string;
            };
            description: string;
        };
        sideOffset: {
            type: string;
            default: string;
            description: string;
        };
        align: {
            type: {
                type: string;
                definition: string;
            };
            description: string;
        };
        alignOffset: {
            type: string;
            default: string;
            description: string;
        };
        avoidCollisions: {
            type: string;
            default: string;
            description: string;
        };
        collisionBoundary: {
            type: {
                type: string;
                definition: string;
            };
            description: string;
        };
        collisionPadding: {
            type: string;
            default: string;
            description: string;
        };
        fitViewport: {
            type: string;
            default: string;
            description: string;
        };
        sameWidth: {
            type: string;
            default: string;
            description: string;
        };
        strategy: {
            type: {
                type: string;
                definition: string;
            };
            default: string;
            description: string;
        };
        overlap: {
            type: string;
            default: string;
            description: string;
        };
        transition: import("@/types").PropSchema;
        transitionConfig: import("@/types").PropSchema;
        inTransition: import("@/types").PropSchema;
        inTransitionConfig: import("@/types").PropSchema;
        outTransition: import("@/types").PropSchema;
        outTransitionConfig: import("@/types").PropSchema;
    };
    slotProps: {
        [x: string]: import("@/types").PropSchema;
    };
    dataAttributes: DataAttrSchema[];
};
export declare const radioIndicator: {
    props: {
        asChild: {
            type: string;
            default: string;
            description: string;
        };
        el: {
            type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
            description: string;
        };
    };
    slotProps: {
        attrs: import("@/types").PropSchema;
        checked: {
            type: string;
            description: string;
        };
    };
    dataAttributes: DataAttrSchema[];
};
export declare const sub: {
    props: {
        disabled: {
            type: string;
            description: string;
        };
        open: {
            type: string;
            default: string;
            description: string;
        };
        onOpenChange: {
            type: {
                type: string;
                definition: string;
            };
            description: string;
        };
    };
    slotProps: {
        subIds: import("@/types").PropSchema;
    };
};
export declare const root: {
    props: {
        preventScroll: {
            default: string;
            type: string;
            description: string;
        };
        closeOnEscape: {
            default: string;
            type: string;
            description: string;
        };
        closeOnOutsideClick: {
            type: string;
            default: string;
            description: string;
        };
        loop: {
            type: string;
            default: string;
            description: string;
        };
        open: {
            type: string;
            default: string;
            description: string;
        };
        onOpenChange: {
            type: {
                type: string;
                definition: string;
            };
            description: string;
        };
        dir: {
            type: {
                type: string;
                definition: string;
            };
            description: string;
        };
        portal: {
            type: {
                type: string;
                definition: string;
            };
            description: string;
        };
        closeFocus: {
            type: import("@/types").PropType;
            description: string;
        };
        typeahead: {
            type: string;
            default: string;
            description: string;
        };
        disableFocusFirstItem: {
            type: string;
            default: string;
            description: string;
        };
        closeOnItemClick: {
            type: string;
            default: string;
            description: string;
        };
        onOutsideClick: import("@/types").PropSchema;
    };
    slotProps: {
        ids: import("@/types").PropSchema;
    };
};
export declare const menu: {
    root: {
        props: {
            preventScroll: {
                default: string;
                type: string;
                description: string;
            };
            closeOnEscape: {
                default: string;
                type: string;
                description: string;
            };
            closeOnOutsideClick: {
                type: string;
                default: string;
                description: string;
            };
            loop: {
                type: string;
                default: string;
                description: string;
            };
            open: {
                type: string;
                default: string;
                description: string;
            };
            onOpenChange: {
                type: {
                    type: string;
                    definition: string;
                };
                description: string;
            };
            dir: {
                type: {
                    type: string;
                    definition: string;
                };
                description: string;
            };
            portal: {
                type: {
                    type: string;
                    definition: string;
                };
                description: string;
            };
            closeFocus: {
                type: import("@/types").PropType;
                description: string;
            };
            typeahead: {
                type: string;
                default: string;
                description: string;
            };
            disableFocusFirstItem: {
                type: string;
                default: string;
                description: string;
            };
            closeOnItemClick: {
                type: string;
                default: string;
                description: string;
            };
            onOutsideClick: import("@/types").PropSchema;
        };
        slotProps: {
            ids: import("@/types").PropSchema;
        };
    };
    trigger: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
        };
        slotProps: {
            [x: string]: import("@/types").PropSchema;
        };
        dataAttributes: DataAttrSchema[];
    };
    content: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
            side: {
                type: {
                    type: string;
                    definition: string;
                };
                description: string;
            };
            sideOffset: {
                type: string;
                default: string;
                description: string;
            };
            align: {
                type: {
                    type: string;
                    definition: string;
                };
                description: string;
            };
            alignOffset: {
                type: string;
                default: string;
                description: string;
            };
            avoidCollisions: {
                type: string;
                default: string;
                description: string;
            };
            collisionBoundary: {
                type: {
                    type: string;
                    definition: string;
                };
                description: string;
            };
            collisionPadding: {
                type: string;
                default: string;
                description: string;
            };
            fitViewport: {
                type: string;
                default: string;
                description: string;
            };
            sameWidth: {
                type: string;
                default: string;
                description: string;
            };
            strategy: {
                type: {
                    type: string;
                    definition: string;
                };
                default: string;
                description: string;
            };
            overlap: {
                type: string;
                default: string;
                description: string;
            };
            transition: import("@/types").PropSchema;
            transitionConfig: import("@/types").PropSchema;
            inTransition: import("@/types").PropSchema;
            inTransitionConfig: import("@/types").PropSchema;
            outTransition: import("@/types").PropSchema;
            outTransitionConfig: import("@/types").PropSchema;
        };
        slotProps: {
            [x: string]: import("@/types").PropSchema;
        };
        dataAttributes: DataAttrSchema[];
    };
    item: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
            disabled: {
                type: string;
                default: string;
                description: string;
            };
            href: {
                type: string;
                description: string;
            };
        };
        slotProps: {
            [x: string]: import("@/types").PropSchema;
        };
        dataAttributes: DataAttrSchema[];
    };
    checkboxItem: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
            disabled: {
                type: string;
                default: string;
                description: string;
            };
            checked: {
                default: string;
                type: string;
                description: string;
            };
            onCheckedChange: {
                type: {
                    type: string;
                    definition: string;
                };
                description: string;
            };
        };
        slotProps: {
            [x: string]: import("@/types").PropSchema;
        };
        dataAttributes: DataAttrSchema[];
    };
    checkboxIndicator: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
        };
        slotProps: {
            attrs: import("@/types").PropSchema;
            checked: {
                type: string;
                description: string;
            };
        };
        dataAttributes: DataAttrSchema[];
    };
    radioGroup: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
            value: {
                type: string;
                description: string;
            };
            onValueChange: {
                type: {
                    type: string;
                    definition: string;
                };
                description: string;
            };
        };
        slotProps: {
            [x: string]: import("@/types").PropSchema;
        };
        dataAttributes: DataAttrSchema[];
    };
    radioItem: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
            value: {
                type: string;
                description: string;
                required: true;
            };
            disabled: {
                type: string;
                description: string;
            };
        };
        slotProps: {
            [x: string]: import("@/types").PropSchema;
        };
        dataAttributes: DataAttrSchema[];
    };
    radioIndicator: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
        };
        slotProps: {
            attrs: import("@/types").PropSchema;
            checked: {
                type: string;
                description: string;
            };
        };
        dataAttributes: DataAttrSchema[];
    };
    separator: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
        };
        slotProps: {
            [x: string]: import("@/types").PropSchema;
        };
        dataAttributes: DataAttrSchema[];
    };
    arrow: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
            size: {
                type: string;
                default: string;
                description: string;
            };
        };
        slotProps: {
            [x: string]: import("@/types").PropSchema;
        };
        dataAttributes: DataAttrSchema[];
    };
    group: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
        };
        slotProps: {
            [x: string]: import("@/types").PropSchema;
        };
        dataAttributes: DataAttrSchema[];
    };
    label: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
        };
        slotProps: {
            [x: string]: import("@/types").PropSchema;
        };
        dataAttributes: DataAttrSchema[];
    };
    sub: {
        props: {
            disabled: {
                type: string;
                description: string;
            };
            open: {
                type: string;
                default: string;
                description: string;
            };
            onOpenChange: {
                type: {
                    type: string;
                    definition: string;
                };
                description: string;
            };
        };
        slotProps: {
            subIds: import("@/types").PropSchema;
        };
    };
    subTrigger: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
            disabled: {
                type: string;
                default: string;
                description: string;
            };
        };
        slotProps: {
            [x: string]: import("@/types").PropSchema;
        };
        dataAttributes: DataAttrSchema[];
    };
    subContent: {
        props: {
            asChild: {
                type: string;
                default: string;
                description: string;
            };
            el: {
                type: "HTMLDivElement" | "HTMLButtonElement" | "HTMLSpanElement" | "HTMLAnchorElement" | "HTMLTableCellElement" | "HTMLTableSectionElement" | "HTMLTableRowElement" | "HTMLTableElement" | "HTMLLabelElement" | "HTMLHeadingElement" | "HTMLImageElement" | "HTMLInputElement" | "HTMLElement";
                description: string;
            };
            side: {
                type: {
                    type: string;
                    definition: string;
                };
                description: string;
            };
            sideOffset: {
                type: string;
                default: string;
                description: string;
            };
            align: {
                type: {
                    type: string;
                    definition: string;
                };
                description: string;
            };
            alignOffset: {
                type: string;
                default: string;
                description: string;
            };
            avoidCollisions: {
                type: string;
                default: string;
                description: string;
            };
            collisionBoundary: {
                type: {
                    type: string;
                    definition: string;
                };
                description: string;
            };
            collisionPadding: {
                type: string;
                default: string;
                description: string;
            };
            fitViewport: {
                type: string;
                default: string;
                description: string;
            };
            sameWidth: {
                type: string;
                default: string;
                description: string;
            };
            strategy: {
                type: {
                    type: string;
                    definition: string;
                };
                default: string;
                description: string;
            };
            overlap: {
                type: string;
                default: string;
                description: string;
            };
            transition: import("@/types").PropSchema;
            transitionConfig: import("@/types").PropSchema;
            inTransition: import("@/types").PropSchema;
            inTransitionConfig: import("@/types").PropSchema;
            outTransition: import("@/types").PropSchema;
            outTransitionConfig: import("@/types").PropSchema;
        };
        slotProps: {
            [x: string]: import("@/types").PropSchema;
        };
        dataAttributes: DataAttrSchema[];
    };
};
