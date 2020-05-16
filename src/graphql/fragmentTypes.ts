
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "Node",
        "possibleTypes": [
          {
            "name": "Asset"
          },
          {
            "name": "Film"
          },
          {
            "name": "Person"
          },
          {
            "name": "Planet"
          },
          {
            "name": "Species"
          },
          {
            "name": "Starship"
          },
          {
            "name": "Vehicle"
          }
        ]
      }
    ]
  }
};
      export default result;
    