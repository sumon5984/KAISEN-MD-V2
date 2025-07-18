/*const {
    Sequelize,
    DataTypes
} = require("sequelize");
const config = require('../../config');
const methods = ['get', 'set', 'add','delete'];
const types = [{'bot': 'object'}, {'delete': 'string'}, {'fake': 'object'}, {'link': 'object'}, {'word': 'object'}, {'demote': 'string'}, {'promote': 'string'}, {'filter': 'object'}, {'warn': 'object'}, {'welcome': 'object'}, {'exit': 'object'}, {'pdm': 'string'}];

function jsonConcat(o1, o2) {
 for (const key in o2) {
  o1[key] = o2[key];
 }
 return o1;
}

const groupDb = config.DATABASE.define("groupDB", {
    jid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bot: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'false'
    },
    delete: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'false'
    },
    fake: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'false'
    },
    word: {
        type: DataTypes.STRING,
        allowNull: true
    },
    demote: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'false'
    },
    promote: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'false'
    },
    filter: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '{}'
    },
    warn: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '{}'
    },
    welcome: {
        type: DataTypes.STRING,
        allowNull: true
    },
    exit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pdm: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'false'
    },
});

async function groupDB(type, options, method) {
    if (!Array.isArray(type) || !options.jid) return;
    if (typeof options != 'object') return;
    let filter = type.map(t => types.filter(a => a[t])[0])
    if (!filter || !filter[0]) return;
    if (method == 'set' || method == 'add' || method == 'delete') {
        filter = filter[0];
        type = type[0]
    } else filter = filter.filter(a => a != undefined)
    if (method == 'set' && typeof options.content != filter[type]) return;
    if (!methods.includes(method)) return;
    let data = await groupDb.findOne({
        where: {
            jid: options.jid
        }
    });
    if (!data) {
        if (method == 'set') {
            const convert_required = filter[type] == 'object' ? true : false;
            if (convert_required) options.content = JSON.stringify(options.content);
            await groupDb.create({
                jid: options.jid,
                [type]: options.content
            })
            return true;
        } else if (method == 'add') {
            const convert_required = filter[type] == 'object' ? true : false;
            if (convert_required) options.content = JSON.stringify(options.content);
            data = await groupDb.create({
                jid: options.jid,
                [type]: options.content
            })
            return convert_required ? JSON.parse(data.dataValues[type]) : data.dataValues[type];
        } else if (method == 'delete') {
            return false;
        } else {
            const msg = {};
            type.map(a=>{
                msg[a] = false;
            })
          return msg;
        }
    } else {
        if (method == 'set') {
            const convert_required = filter[type] == 'object' ? true : false;
            if (convert_required) options.content = JSON.stringify(options.content);
            await data.update({
                [type]: options.content
            })
            return true;
        } else if (method == 'add') {
            const convert_required = filter[type] == 'object' ? true : false;
            if (convert_required) options.content = JSON.stringify(jsonConcat(JSON.parse(data.dataValues[type]), options.content))
            await data.update({
                [type]: options.content
            })
            return convert_required ? JSON.parse(data.dataValues[type]) : data.dataValues[type];
        } else if (method == 'delete') {
            if (!options.content.id) return;
            const convert_required = filter[type] == 'object' ? true : false;
            if (convert_required) {
                const json = JSON.parse(data.dataValues[type]);
                if (!json[options.content.id]) return false;
                delete json[options.content.id];
                options.content = JSON.stringify(json);
            }
            await data.update({
                [type]: options.content
            })
            return true;
        } else {
            const msg = {};
            filter.map(t => {
                const v = Object.keys(t)[0];
                const convert_required = t[v] == 'object' ? true : false;
                const value = convert_required ? JSON.parse(data.dataValues[v]) : data.dataValues[v]
                msg[v] = value;
            })
            return msg;
        }
    }
}
module.exports = {groupDB};*/


const { Sequelize, DataTypes } = require("sequelize");
const config = require('../../config'); // adjust path as needed

const methods = ['get', 'set', 'add', 'delete'];
const types = [
  { bot: 'object' }, { delete: 'string' }, { fake: 'object' },
  { link: 'object' }, { word: 'object' }, { demote: 'string' },
  { promote: 'string' }, { filter: 'object' }, { warn: 'object' },
  { welcome: 'object' }, { exit: 'object' }, { pdm: 'string' }
];

function jsonConcat(o1, o2) {
  for (const key in o2) o1[key] = o2[key];
  return o1;
}

const groupDb = config.DATABASE.define("groupDB", {
  jid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bot: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'false'
  },
  delete: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'false'
  },
  fake: {
    type: DataTypes.STRING,
    allowNull: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'false'
  },
  word: {
    type: DataTypes.STRING,
    allowNull: true
  },
  demote: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'false'
  },
  promote: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'false'
  },
  filter: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '{}'
  },
  warn: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '{}'
  },
  welcome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  exit: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pdm: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'false'
  }
});

async function groupDB(type, options, method) {
  if (!Array.isArray(type) || typeof options !== 'object' || !options.jid) return;

  let filter = type.map(t => types.find(a => a[t])).filter(Boolean);
  if (!filter.length || !methods.includes(method)) return;

  if (['set', 'add', 'delete'].includes(method)) {
    // Single type expected
    filter = filter[0];
    type = type[0];
  }

  const dbData = await groupDb.findOne({ where: { jid: options.jid } });

  // ---------- SET ----------
  if (method === 'set') {
    if (typeof options.content !== filter[type]) return;

    const contentValue = filter[type] === 'object' ? JSON.stringify(options.content) : options.content;

    if (!dbData) {
      await groupDb.create({ jid: options.jid, [type]: contentValue });
    } else {
      await dbData.update({ [type]: contentValue });
    }
    return true;
  }

  // ---------- ADD ----------
  if (method === 'add') {
    let existing = dbData ? dbData.dataValues[type] : (filter[type] === 'object' ? '{}' : '');
    if (filter[type] === 'object') {
      const updated = JSON.stringify(jsonConcat(JSON.parse(existing || '{}'), options.content));
      if (dbData) {
        await dbData.update({ [type]: updated });
      } else {
        await groupDb.create({ jid: options.jid, [type]: updated });
      }
      return JSON.parse(updated);
    } else {
      if (dbData) {
        await dbData.update({ [type]: options.content });
        return options.content;
      } else {
        await groupDb.create({ jid: options.jid, [type]: options.content });
        return options.content;
      }
    }
  }

  // ---------- DELETE ----------
  if (method === 'delete') {
    if (!dbData || !options.content?.id || filter[type] !== 'object') return false;

    const json = JSON.parse(dbData.dataValues[type] || '{}');
    if (!json[options.content.id]) return false;
    delete json[options.content.id];
    await dbData.update({ [type]: JSON.stringify(json) });
    return true;
  }

  // ---------- GET ----------
  if (method === 'get') {
    if (!dbData) {
      // Return default structure
      const result = {};
      filter.forEach(f => {
        const k = Object.keys(f)[0];
        result[k] = f[k] === 'object' ? {} : 'false';
      });
      return result;
    }

    const result = {};
    filter.forEach(f => {
      const k = Object.keys(f)[0];
      const val = dbData.dataValues[k];
      result[k] = f[k] === 'object' ? JSON.parse(val || '{}') : val;
    });
    return result;
  }

  return;
}

module.exports = { groupDB };