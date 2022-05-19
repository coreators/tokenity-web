const types = ["post", "story", "ticket", "art", "funding", "certification"];

const nftTypes = ["ticket", "art", "funding", "certification"];

const extraInputs = {
  ticket: [
    {
      type: "text",
      title: "Title",
      key: "title",
    },
    {
      type: "text",
      title: "SubTitle",
      key: "subtitle",
    },
    {
      type: "switch",
      switchLabel: "Put it on sale",
      key: "onsale",
    },
    {
      type: "min_bid",
      title: "Minimum Bid",
      key: "min_bid",
      options: {
        min: 0,
        step: 0.00000001,
      },
    },
    {
      type: "date",
      title: "Date",
      key: "date",
    },
    {
      type: "number",
      title: "Creator royalty",
      key: "creator_royalty",
      options: {
        min: 0,
        max: 100,
      },
    },
    {
      type: "number",
      title: "Holder royalty",
      key: "holder_royalty",
      options: {
        min: 0,
        max: 100,
      },
    },
  ],
  art: [
    {
      type: "text",
      title: "Title",
      key: "title",
    },
    {
      type: "switch",
      switchLabel: "Put it on sale",
      key: "onsale",
    },
    {
      type: "min_bid",
      title: "Minimum Bid",
      key: "min_bid",
      options: {
        min: 0,
      },
    },
    {
      type: "number",
      title: "Creator royalty",
      key: "creator_royalty",
      options: {
        min: 0,
        max: 100,
      },
    },
    {
      type: "number",
      title: "Holder royalty",
      key: "holder_royalty",
      options: {
        min: 0,
        max: 100,
      },
    },
  ],
  funding: [
    {
      type: "text",
      title: "Title",
      key: "title",
    },
    {
      type: "switch",
      switchLabel: "Put it on sale",
      key: "onsale",
    },
    {
      type: "min_bid",
      title: "Target Price",
      key: "target_price",
      options: {
        min: 0,
      },
    },
    {
      type: "date",
      title: "End Date",
      key: "end_date",
    },
    {
      type: "number",
      title: "Creator royalty",
      key: "creator_royalty",
      options: {
        min: 0,
        max: 100,
      },
    },
    {
      type: "number",
      title: "Holder royalty",
      key: "holder_royalty",
      options: {
        min: 0,
        max: 100,
      },
    },
  ],
  certification: [
    {
      type: "text",
      title: "Title",
      key: "title",
    },
    {
      type: "switch",
      switchLabel: "Put it on sale",
      key: "onsale",
    },
    {
      type: "min_bid",
      title: "Minimum Bid",
      key: "min_bid",
      options: {
        min: 0,
      },
    },
    {
      type: "number",
      title: "Creator royalty",
      key: "creator_royalty",
      options: {
        min: 0,
        max: 100,
      },
    },
    {
      type: "number",
      title: "Holder royalty",
      key: "holder_royalty",
      options: {
        min: 0,
        max: 100,
      },
    },
  ],
};
export { types, nftTypes, extraInputs };
