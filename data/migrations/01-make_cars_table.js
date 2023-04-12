exports.up = function (knex) {
  //creates table with the specified schema...
  return knex.schema.createTable("cars", (table) => {
    //primary key will be an auto-incrementing id
    table.increments("id");
    table.string("vin").notNullable().unique();

    table.string("make").notNullable();

    table.string("model").notNullable();

    table.string("mileage").notNullable();

    table.string("title");

    table.string("transmission");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
