/**
 * Word Dictionary and Generator
 */
const easy_words = ["cat", "sun", "cup", "ghost", "flower", "pie", "cow", "banana", "snowflake", "bug", "book", "jar", "snake", "light", "tree", "lips", "apple", "slide", "socks", "smile", "swing", "coat", "shoe", "water", "heart", "hat", "ocean", "kite", "dog", "mouth", "milk", "duck", "eyes", "skateboard", "bird", "boy", "apple", "person", "girl", "mouse", "ball", "house", "star", "nose", "bed", "whale", "jacket", "shirt", "hippo", "beach", "egg", "face", "cookie", "cheese", "ice cream cone", "drum", "circle", "spoon", "worm", "spider web"];
const easy_words_2 = ["bridge", "bone", "grapes", "bell", "jellyfish", "bunny", "truck", "grass", "door", "monkey", "spider", "bread", "ears", "bowl", "bracelet", "alligator", "bat", "clock", "lollipop", "moon", "doll", "orange", "ear", "basketball", "bike", "airplane", "pen", "inchworm", "seashell", "rocket", "cloud", "bear", "corn", "chicken", "purse", "glasses", "blocks", "carrot", "turtle", "pencil", "horse", "dinosaur", "head", "lamp", "snowman", "ant", "giraffe", "cupcake", "chair", "leaf", "bunk bed", "snail", "baby", "balloon", "bus", "cherry", "crab", "football", "branch", "robot"];

const medium_words = ["horse", "door", "song", "trip", "backbone", "bomb", "round", "treasure", "garbage", "park", "pirate", "ski", "state", "whistle", "palace", "baseball", "coal", "queen", "dominoes", "photograph", "computer", "hockey", "aircraft", "hotdog", "salt", "pepper", "key", "iPad", "whisk", "frog", "lawnmower", "mattress", "pinwheel", "cake", "circus", "battery", "mailman", "cowboy", "password", "bicycle", "skate", "electricity", "lightsaber", "thief", "teapot", "deep", "spring", "nature", "shallow", "toast", "outside", "America", "roller blading", "gingerbread man", "bowtie", "half", "spare", "wax", "light bulb", "platypus", "music"];
const medium_words_2 = ["fist", "base", "storm", "mitten", "easel", "nail", "sheep", "stoplight", "coconut", "crib", "hippopotamus", "ring", "seesaw", "plate", "fishing pole", "hopscotch", "bell pepper", "front porch", "cheek", "video camera", "washing machine", "telephone", "silverware", "barn", "snowflake", "bib", "flashlight", "popsicle", "muffin", "sunflower", "skirt", "top hat", "swimming pool", "tusk", "radish", "peanut", "spool", "poodle", "potato", "face", "shark", "fang", "snowball", "waist", "spoon", "gate", "bottle", "mail", "sheep", "lobster", "ice", "crib", "lawn mower", "bubble", "seesaw", "pencil", "cheeseburger", "hopscotch", "rocking chair", "corner", "cheek", "popcorn", "telephone", "yo-yo", "seahorse", "snowflake", "spine", "desk"];
const medium_words_3 = ["sailboat", "popsicle", "brain", "birthday cake", "skirt", "knee", "pineapple", "tusk", "sprinkler", "money", "spool", "lighthouse", "doormat", "face", "flute", "rug", "snowball", "purse", "owl", "gate", "suitcase", "stomach", "doghouse", "pajamas", "bathroom scale", "peach", "newspaper", "watering can", "hook", "school", "beaver", "french fries", "beehive", "beach", "artist", "flagpole", "camera", "hair dryer", "mushroom", "toe", "pretzel", "TV", "quilt", "chalk", "dollar", "soda", "chin", "swing", "garden", "ticket", "boot", "cello", "rain", "clam", "pelican", "stingray", "fur", "blowfish", "rainbow", "happy"];

const hard_words = ["snag", "jungle", "important", "mime", "peasant", "baggage", "hail", "clog", "pizza sauce", "password", "scream", "newsletter", "bookend", "pro", "dripping", "pharmacist", "lie", "catalog", "ringleader", "husband", "laser", "diagonal", "comfy", "myth", "dorsal", "biscuit", "hydrogen", "macaroni", "rubber", "darkness", "yolk", "exercise", "vegetarian", "shrew", "chestnut", "ditch", "wobble", "glitter", "neighborhood", "dizzy", "fireside", "retail", "drawback", "logo", "fabric", "mirror", "barber", "jazz", "migrate", "drought", "commercial", "dashboard", "bargain", "double", "download", "professor", "landscape", "ski goggles", "vitamin"];
const hard_words_2 = ["half", "cardboard", "oar", "baby-sitter", "drip", "shampoo", "point", "time machine", "yardstick", "think", "lace", "darts", "world", "avocado", "bleach", "shower curtain", "extension cord", "dent", "birthday", "lap", "sandbox", "bruise", "quicksand", "fog", "gasoline", "pocket", "honk", "sponge", "rim", "bride", "wig", "zipper", "wag", "letter opener", "fiddle", "water buffalo", "pilot", "brand", "pail", "baguette", "rib", "mascot", "fireman pole", "zoo", "sushi", "fizz", "ceiling fan", "bald", "banister", "punk", "post office", "season", "Internet", "chess", "puppet", "chime", "ivy", "full", "koala", "dentist"];
const hard_words_3 = ["baseboards", "ping pong", "bonnet", "mast", "hut", "welder", "dryer sheets", "sunburn", "houseboat", "sleep", "kneel", "crust", "grandpa", "speakers", "cheerleader", "dust bunny", "salmon", "cabin", "handle", "swamp", "cruise", "wedding cake", "crow's nest", "macho", "drain", "foil", "orbit", "dream", "recycle", "raft", "gold", "plank", "cliff", "sweater vest", "cape", "safe", "picnic", "shrink ray", "leak", "boa constrictor", "deep", "mold", "CD", "tiptoe", "hurdle", "knight", "loveseat", "cloak", "bedbug", "bobsled", "hot tub", "firefighter", "cellphone charger", "beanstalk", "nightmare", "coach", "moth", "sneeze", "wooly mammoth", "pigpen", "swarm", "goblin", "chef", "applause", "wax", "sheep dog", "s'mores", "plow", "runt"];

const difficult_words = ["vision", "loiterer", "observatory", "century", "Atlantis", "kilogram", "neutron", "stowaway", "psychologist", "exponential", "aristocrat", "eureka", "parody", "cartography", "figment", "philosopher", "tinting", "overture", "opaque", "Everglades", "ironic", "zero", "landfill", "implode", "czar", "armada", "crisp", "stockholder", "inquisition", "mooch", "gallop", "archaeologist", "blacksmith", "addendum", "upgrade", "hang", "ten", "acre", "twang", "mine", "car", "protestant", "brunette", "stout", "quarantine", "tutor", "positive", "champion", "pastry", "tournament", "Chick-fil-A", "rainwater", "random", "lyrics", "ice", "fishing", "clue", "flutter", "slump", "ligament", "flotsam", "siesta", "pomp"];

const wordsByLevel = {
  EASY: new Set([...easy_words, ...easy_words_2]),
  MEDIUM: new Set([...medium_words, ...medium_words_2, ...medium_words_3]),
  HARD: new Set([...hard_words, ...hard_words_2, ...hard_words_3]),
  DIFFUCULT: new Set([...difficult_words])
}

// Fisher–Yates shuffle
const shuffle = (words) => {
  const a = [...words];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class Words {
  constructor(level) {
    this.level = level;
    this.words = this.generateWords();
  }

  getWord() {
    try {
      if (this.words.length) {
        return this.words.pop();
      } else {
        this.words = this.generateWords();
        return this.words.pop();
      }      
    } catch(e) {
      console.error(e);
    }
  }

  generateWords() {
    try {
      const words = wordsByLevel[this.level];
      return shuffle(words);
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = Words;
