class EntityPool
{
    constructor()
    {
        this._items = [];
    }
    new(a,b,c,d,e,f){return new Entity(a,b,c,d,e,f);}

    forEach(callback)
    {
        this._items.forEach((item,i) => callback(item,i));
    }
    add(entity)
    {
        this._items.push(entity);
    }
    indexOf(entity) {
        return this._items.indexOf(entity);
    }
    get length()
    {
        //Fake array
        this._items.forEach((item,i) => this[i] = item);
        return this._items.length;
    }
}
class PlayerPool extends EntityPool
{
    broadcast(message)
    {
        
    }
    add(player)
    {
        this._items.push(player);
        mp.events.simulate("playerJoin",player);
    }
}
class EventPool extends EntityPool
{
    constructor()
    {
        super();
        this.events= {
            playerJoin: [],
            playerExitVehicle: [],
            playerChat: [],
            playerDeath: [],
            playerQuit: [],
        }
    }
    addCommand(event,callback)
    {
        //Create the event
        this.events[event] = [];

        this.add(event,callback);
    }
    add(event,callback)
    {
        if(this.events[event] == undefined)
        {
            console.log(`Mock event not found for '${event}'`);
            return;
        }
        this.events[event].push(callback);
    }
    simulate(event)
    {
        if(this.events[event] == undefined)
        {
            console.log(`Simulate Mock event not found for '${event}'`);
            return;
        }
        var args = Array.from(arguments);
        args.splice(0,1);
        this.events[event].forEach(callback => callback(...args));
    }
}
class Vector3
{
    constructor(x,y,z)
    {
        this.x = isNaN(x) ? 0:x;
        this.y = isNaN(y) ? 0:y;
        this.z = isNaN(z) ? 0:z;
    }
}
class Entity
{
    constructor()
    { 
        this.name = "";
        this.data = {
            
        }
        this.position = new Vector3();
    }
    setVariable(prop,data) {
        this.data[prop] = data;
    }
    getVariable(prop) {
        return this.data[prop];
    }
    destroy()
    {

    }
}
class Player extends Entity
{
    constructor(name = "Mock Player")
    {
        super();
        this.name = name;
    }

    removeAllWeapons(){};
    giveWeapon(){}
    outputChatBox(message){ Console.log(`[${this.name}] ${message}`)};
    spawn(location){};
}
class EntityArray
{
    new(a,b,c,d,e,f){}
}
function joaat(asset)
{
    return "hashvalue";
}
class MockServer
{
    static AddPlayer(player)
    {
        mp.players.add(player);
    }
    static ServerCommand(player,cmd,str)
    {
        Console.debug(`${player.name}:/${cmd} ${str}`);
        mp.events.simulate(cmd,player,str);
    }
}

var mp = {
    events: new EntityPool(),
    players: new EntityPool()
};

//Bind methods to object
mp.Vector3 = Vector3;
mp.joaat = joaat;
mp.Player = Player;
mp.vehicles = new EntityPool();
mp.blips = new EntityArray();
mp.players = new PlayerPool();
mp.events = new EventPool();
global.Mock = MockServer;
module.exports = mp;