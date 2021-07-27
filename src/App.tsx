import { FC } from "react";
import "./App.css";
import Product from "./Product";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

const content1 =
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.";
const content2 =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo";

const productList = [
  {
    id: "product-001",
    name: "Audio-Technica ATH-MSR7",
    color: "black",
    details: "2017 Best Headphones of the Year Award Winner",
    image: `${window.location.href}assets/ath-msr7-black.jpg`,
    newPrice: 59.99,
    oldPrice: 89.99,
    currency: "$",
    detailsTab: [
      {
        id: 1,
        label: "DESCRIPTION",
        content: content1,
      },
      { id: 2, label: "DETAILS", content: content2 },
    ],
  },

  {
    id: "product-002",
    name: "Audio-Technica ATH-MSR7",
    color: "brown",
    details: "2017 Best Headphones of the Year Award Winner",
    image: `${window.location.href}assets/ath-msr7-brown.jpg`,
    newPrice: 59.99,
    oldPrice: 89.99,
    currency: "$",
    detailsTab: [
      {
        id: 1,
        label: "DESCRIPTION",
        content: content1,
      },
      { id: 2, label: "DETAILS", content: content2 },
    ],
  },
];

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/product">
          <Product productList={productList} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

const Home: FC = () => {
  const { push } = useHistory();
  const handleSelectProduct = (id: string) => push(`/product?id=${id}`);

  return (
    <div className="relative flex xs:flex-col lg:flex-row p-8">
      <div className="flex gap-4 xs:flex-col md:flex-row">
        {productList.map(({ id, name, color, newPrice, image, currency }) => (
          <div
            onClick={() => handleSelectProduct(id)}
            key={id}
            className="flex rounded-lg shadow border bg-white flex-col cursor-pointer hover:border hover:border-solid hover:border-blue-300"
          >
            <div className="flex w-auto">
              <img src={image} alt={name} className="w-full h-full max-w-sm" />
            </div>
            <div>
              <div className="flex sm:flex-row sm:justify-between p-6 bg-gray-200 xs:justify-between xs:flex-col">
                <span className="flex flex-col">
                  <span className="text-lg font-bold ">{name}</span>
                  <span className="text-sm text-gray-600">{color}</span>
                </span>
                <span className="text-blue-500">{`${currency}${newPrice}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
