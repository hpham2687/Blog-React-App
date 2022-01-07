import { validatePostForm } from "../utils/post";
import { v4 as uuidv4 } from "uuid";

// const { hash, validateUserForm, sanitizeUser } = authUtils;
const postsKey = "__all_post__";
let allPosts = {};
const persist = () =>
  window.localStorage.setItem(postsKey, JSON.stringify(allPosts));
const load = () =>
  Object.assign(allPosts, JSON.parse(window.localStorage.getItem(postsKey)));

// initialize
try {
  load();
} catch (error) {
  persist();
  // ignore json parse error
}
const posts = [
  {
    _id: "61ab37f8aba0176343688b99",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Pitts Shaw",
    gender: "male",
    title: "Dorothy Chase",
    content:
      "Magna minim tempor nulla aliqua. Ea exercitation sit irure sit eiusmod anim. Anim voluptate commodo consequat incididunt occaecat.\r\n",
    posted_date: "2015-07-16T11:52:12 -07:00",
  },
  {
    _id: "61ab37f88efebbe578058b6e",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Shaffer Hurst",
    gender: "male",
    title: "Berta Head",
    content:
      "Do excepteur aute sunt ut dolor aute id dolor laboris reprehenderit voluptate commodo aliqua. Officia et aliquip nostrud quis commodo officia ipsum et deserunt exercitation officia aute id nulla. Cillum ea laboris consequat proident incididunt est ad eu labore excepteur. Nostrud sint laborum non non nostrud quis esse est in deserunt velit veniam.\r\n",
    posted_date: "2017-12-21T12:52:49 -07:00",
  },
  {
    _id: "61ab37f8aa38184ad4862d76",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Marcia Strong",
    gender: "female",
    title: "Alana Durham",
    content:
      "Non cupidatat laborum consectetur amet voluptate occaecat ea dolore. Adipisicing adipisicing incididunt proident magna dolor adipisicing commodo in in cupidatat veniam. Aute deserunt labore in aute deserunt reprehenderit deserunt ut dolore aliquip veniam velit dolor. Non veniam velit fugiat proident. Irure anim adipisicing irure veniam.\r\n",
    posted_date: "2016-10-14T06:41:26 -07:00",
  },
  {
    _id: "61ab37f8bf4349927c063bae",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Maude Ferguson",
    gender: "female",
    title: "Lula Taylor",
    content:
      "Est id irure dolore cupidatat consectetur aliqua aliquip do mollit non. Laborum eu nisi anim tempor ut do commodo Lorem laborum sint adipisicing voluptate. Do quis est voluptate magna laboris quis sint nisi nisi. Dolore tempor excepteur adipisicing consectetur mollit officia.\r\n",
    posted_date: "2019-06-22T02:59:06 -07:00",
  },
  {
    _id: "61ab37f84901313c0b04c5a6",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Houston York",
    gender: "male",
    title: "Cantu Holloway",
    content:
      "Fugiat officia eiusmod enim dolore fugiat elit. Aliqua aute ullamco ut non sit sunt sunt eiusmod duis quis. Sit cillum mollit duis ullamco laborum deserunt consectetur sunt. Consequat est sint laboris culpa aliquip consequat dolore ea minim exercitation. Proident consectetur labore voluptate sint quis.\r\n",
    posted_date: "2016-12-01T03:25:34 -07:00",
  },
  {
    _id: "61ab37f80214a4b7d0d6fead",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Francis Oneal",
    gender: "female",
    title: "Marcie Daniel",
    content:
      "Qui voluptate nostrud duis ex duis sunt dolor aliquip nulla irure dolor commodo deserunt. Nisi esse et reprehenderit laborum do excepteur tempor nisi non dolor quis. Reprehenderit elit occaecat nostrud fugiat veniam commodo deserunt nisi ipsum ea.\r\n",
    posted_date: "2016-03-07T12:29:28 -07:00",
  },
  {
    _id: "61ab37f8b605daca1b9a58b3",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Mcknight Goff",
    gender: "male",
    title: "Patrick Monroe",
    content:
      "Eiusmod irure officia elit dolore duis non minim sint pariatur id reprehenderit nulla. Cupidatat exercitation irure eiusmod aliquip est excepteur commodo tempor officia velit. Labore cillum ut excepteur occaecat est ea. Duis exercitation dolor minim ullamco cillum nulla do cupidatat in laboris nisi elit est velit.\r\n",
    posted_date: "2019-08-05T02:35:34 -07:00",
  },
  {
    _id: "61ab37f8053bea204ebd3e77",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Chasity Bates",
    gender: "female",
    title: "Tyler Ortega",
    content:
      "Proident ea irure ex eiusmod aliquip tempor. Fugiat veniam eu dolore sint ex nulla aliqua dolor eiusmod Lorem non aliqua esse deserunt. Deserunt laborum in laboris et proident ipsum id laboris.\r\n",
    posted_date: "2016-03-31T11:58:09 -07:00",
  },
  {
    _id: "61ab37f8b3c9d35d6262e263",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Rodgers Keith",
    gender: "male",
    title: "Leonard Clay",
    content:
      "Deserunt veniam cupidatat irure qui cupidatat. Qui sint ex occaecat ad. Enim eiusmod sit quis non dolore sunt cillum ex laborum sit.\r\n",
    posted_date: "2015-09-02T02:33:31 -07:00",
  },
  {
    _id: "61ab37f874bbaae704b159dd",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Magdalena Yates",
    gender: "female",
    title: "Barrett Mccormick",
    content:
      "Eiusmod eiusmod irure deserunt ullamco deserunt adipisicing irure nulla aliquip. Deserunt irure aliquip elit proident consectetur sit exercitation officia eu ea labore ullamco tempor minim. Quis adipisicing non magna aute labore adipisicing irure amet deserunt ullamco enim laboris. Dolore laborum consequat minim laborum magna aute minim eu. Laboris minim anim non nulla adipisicing laboris deserunt officia sunt. Nostrud ad do nostrud culpa aute aliqua culpa et labore exercitation enim. Deserunt commodo sunt est ullamco irure consequat ex.\r\n",
    posted_date: "2020-07-27T12:36:39 -07:00",
  },
  {
    _id: "61ab37f813fe2c3398721547",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Jordan English",
    gender: "male",
    title: "Frank Tucker",
    content:
      "Esse nostrud magna anim ullamco elit pariatur sint. Sit minim dolore ad veniam velit. Lorem mollit ex sit adipisicing occaecat esse labore ullamco exercitation elit consequat sunt. Exercitation Lorem excepteur dolor velit veniam officia duis irure anim. Eiusmod eiusmod ullamco laborum quis adipisicing voluptate aute qui exercitation qui laborum est amet nisi. Elit esse irure magna do minim cupidatat sunt ea anim deserunt aute non esse.\r\n",
    posted_date: "2021-05-16T12:13:42 -07:00",
  },
  {
    _id: "61ab37f8caa06ff287390c94",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Joyce Blevins",
    gender: "female",
    title: "Hodge Conner",
    content:
      "Amet id nulla id labore ullamco ad voluptate. Dolore consectetur dolore dolor proident eu consequat dolore eiusmod excepteur do magna qui laboris. Laboris nulla fugiat dolore id duis duis duis proident proident tempor fugiat. Aliquip irure velit deserunt et aute enim culpa dolore non ut magna minim nostrud. Aliqua quis nostrud aute non non dolor labore. Sint cupidatat mollit ad eiusmod veniam ex ad.\r\n",
    posted_date: "2014-08-07T05:01:41 -07:00",
  },
  {
    _id: "61ab37f8020824ae76676233",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Celina Clayton",
    gender: "female",
    title: "Janell Daniels",
    content:
      "Irure est quis consectetur ipsum esse id aliquip laborum magna. Labore cillum laborum dolor aute elit eu pariatur laborum exercitation ullamco magna pariatur officia. Aliqua sint dolore minim labore id id aute velit ut excepteur amet exercitation laboris.\r\n",
    posted_date: "2021-06-19T12:21:30 -07:00",
  },
  {
    _id: "61ab37f8074483351e83b2a3",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Macdonald Walls",
    gender: "male",
    title: "Adams Nash",
    content:
      "Deserunt reprehenderit nulla nulla qui ad aliquip. Laboris quis aute ex enim ex ullamco magna incididunt laborum id ut magna fugiat. Tempor aliquip sunt commodo elit culpa qui laboris eiusmod. Laboris minim elit labore ad adipisicing aliqua in quis sunt eu dolore non laboris deserunt.\r\n",
    posted_date: "2021-06-04T08:32:28 -07:00",
  },
  {
    _id: "61ab37f87251b7e082a39aca",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Pansy Chapman",
    gender: "female",
    title: "Penny Shepard",
    content:
      "Nostrud aliqua laborum culpa ad. Duis consequat sit ut dolor in duis enim cillum id aute sit. Reprehenderit esse in labore reprehenderit reprehenderit. Culpa fugiat incididunt dolore nulla laborum duis officia. Id fugiat incididunt occaecat ad consectetur in laboris aliqua aute esse labore minim. Adipisicing Lorem labore aliqua velit veniam est consectetur duis tempor occaecat aute sit. Esse laboris irure in ad velit voluptate consectetur.\r\n",
    posted_date: "2016-01-04T03:32:27 -07:00",
  },
  {
    _id: "61ab37f889c905cb3a89742e",
    picture: "https://picsum.photos/seed/picsum/300/250",
    name: "Ashlee Griffith",
    gender: "female",
    title: "Palmer Wiley",
    content:
      "Est occaecat dolore eu consectetur et ea enim labore voluptate ea. Tempor pariatur nulla eu aliqua ipsum consequat aliqua elit dolore sunt aute sit eiusmod eiusmod. Ex magna pariatur ipsum proident sunt velit esse laborum officia ea enim sit occaecat occaecat. Anim aute velit ipsum sunt veniam consequat in sunt do sunt ullamco veniam veniam. Adipisicing velit nostrud laboris sint laborum culpa consequat.\r\n",
    posted_date: "2018-09-30T07:19:44 -07:00",
  },
];

async function create({ user, title, content, picture }) {
  validatePostForm({ title, content, picture });
  const id = uuidv4();

  allPosts[id] = {
    authorId: user.id,
    authorName: user.username,
    title,
    content,
    picture,
    createdAt: Date.now(),
  };
  persist();
  return read(id);
}

async function read(id) {
  validatePost(id);
  return allPosts[id];
}

function validatePost(id) {
  load();
  if (!allPosts[id]) {
    const error = new Error(`No posts with the id "${id}"`);
    error.status = 404;
    throw error;
  }
}
function getArrayFromObjectPosts() {
  load();
  return Object.keys(allPosts).map((key) => ({ ...allPosts[key], id: key }));
  // return Object.keys(allPosts).map((key) => ({ [key]: allPosts[key] }));
}

async function getPost(page = 1, items_per_page = 6, search = null) {
  if (page < 1) {
    const error = new Error(`Page number must be >=1`);
    error.status = 400;
    throw error;
  }
  let posts = [...getArrayFromObjectPosts()];
  console.log(search);
  if (search) {
    posts = posts.filter((post) => {
      // console.log(post.title);
      // console.log(post.title.includes(search));
      return post.title.includes(search);
    });
  }
  console.log({ page });
  console.log({ postsAfter: posts });
  // console.log({ Postlength: posts.length });
  // console.log(`handle page = ${page}, items_per_page = ${items_per_page}`);
  let maximunNumOfPages = Math.ceil(posts.length / items_per_page);
  console.log({ posts, maximunNumOfPages });
  if (page > maximunNumOfPages) {
    return { posts: [], items_per_page };
  }
  const indexFrom = (page - 1) * items_per_page;
  const maximunIndex = posts.length - 1;
  const indexTo =
    page * items_per_page - 1 <= maximunIndex
      ? page * items_per_page - 1
      : maximunIndex;
  posts = posts.slice(indexFrom, indexTo + 1);

  console.log(indexFrom + " to " + indexTo);

  return { posts, items_per_page, page };
}
// async function read(id) {
//   validateUser(id);
//   return sanitizeUser(users[id]);
// }
export { posts, getPost, create };
