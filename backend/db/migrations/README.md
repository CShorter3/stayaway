Migrations work independent of enviroment:



    1A. Each migration file dynamically populates an 'options' object with a key-value pair that corresponds with the correct enviroment.

    1B. This allows each migration to target the appopriate database or schema.

    1C. like: 

        # assign options.schema to the corresponding env <process.env.SCHEMA> variable

        let options = {};
    
        if (process.env.NODE_ENV === 'production') {
            options.schema = process.env.SCHEMA;
        }



    2A. Similary, each migration file dynaically adjust the 'options' properties 
    on it's up and down methods to target the apporpriate resources.

    2B. like:

        # add table name before removing table, with schema adjustment if needed.

        options.tableName = "Users";

        if (process.env.NODE_ENV === 'production') {
            options.schema = process.env.SCHEMA;
        }

        return queryInterface.dropTable(options);
