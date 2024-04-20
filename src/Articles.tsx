import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { Constant } from "./Constant";
import Grid from "./images/grid.png";
import List from "./images/list.jpg";
import Sort from "./images/sort.png";
import Asc from "./images/asc-img.png";
import Desc from "./images/desc-img.png";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";
import { ImageFilter } from "./ImageFilter";

interface IArticleProp {
  id?: string;
  title?: string;
  summary?: string;
  showModal: any;
  setId: (id: string) => void;
}

export function Articles({ showModal, setId }: IArticleProp) {
  const [articles, setArticles] = useState<{
    articleItems: IArticleProp[];
    isLoading: boolean;
    error: string;
  }>({
    articleItems: [],
    isLoading: true,
    error: "",
  });

  const [searchVal, setSearchVal]: [string, (searchVal: string) => void] =
    useState<string>("");

  const [itemImg, setItemImg]: [string, (itemImg: string) => void] =
    useState<string>(List);

  const [sortType, setSortType]: [string, (sortType: string) => void] =
    useState<string>(Sort);

  const [showSummary, setShowSummary]: [
    boolean,
    (showSummary: boolean) => void
  ] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(Constant.ARTICLE_URL) 
      .then((response) => {
        setArticles({
          articleItems: response.data,
          isLoading: false,
          error: "",
        });
      })
      .catch((err) => {
        let error =
          err.response.status === 404
            ? Constant.ERROR_NO_RES
            : Constant.UNEXP_ERROR;
        setArticles({ articleItems: [], isLoading: false, error: error });
      });
  }, [setId]);

  const selectedArticle = (data: IArticleProp) => {
    setId(data.id ?? "");
    showModal();
  };

  const sortArticles = () => {
    const articleList = [...articles.articleItems];
    sortType === Desc ? setSortType(Asc) : setSortType(Desc);
    let sortArray = articleList.sort((a: any, b: any) => {
      return sortType === Desc
        ? b.title?.localeCompare(a.title)
        : a.title?.localeCompare(b.title);
    });
    setArticles((prevVal) => {
      return { ...prevVal, articleItems: sortArray };
    });
  };

  const filteredArticles = (e: IArticleProp) => {
    let filteredData =
      searchVal === ""
        ? articles
        : e.title?.toUpperCase().indexOf(searchVal.toUpperCase()) !== -1;
    return filteredData;
  };

  const toggleSummary = (e: ChangeEvent<HTMLInputElement>) => {
    setShowSummary(e.target.checked);
  };

  return (
    <div>
      {articles.isLoading && <Loader />}
      {articles.error && <ErrorPage error={articles.error} />}
      {articles.articleItems?.length > 0 && (
        <div className="container-div">
          <div className="input-cntr">
            <input
              type="search"
              placeholder="Search"
              value={searchVal}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchVal(e.target.value)
              }
            />
            <div>
              <input
                type="checkbox"
                id="check-box-summary"
                checked={showSummary}
                onChange={toggleSummary}
              />
              <label htmlFor="check-box-summary">{`${
                showSummary ? Constant.HIDE : Constant.SHOW
              }`}</label>
            </div>
            <ImageFilter
              src={itemImg}
              alt={itemImg === Grid ? Constant.GRID : Constant.LIST}
              onClick={() =>
                itemImg === List ? setItemImg(Grid) : setItemImg(List)
              }
            />
            <ImageFilter
              src={sortType}
              alt={sortType === Desc ? Constant.DESC_SORT : Constant.ASC_SORT}
              onClick={sortArticles}
            />
          </div>
          <div className={`${itemImg !== List ? "list" : "container"}`}>
            {articles.articleItems
              ?.filter((article) => filteredArticles(article))
              .map((article) => (
                <div
                  className="item"
                  key={article.id}
                  onClick={() => selectedArticle(article)}
                >
                  <h3 className="item-heading">{article.title}</h3>
                  {showSummary && (
                    <p title={article.summary}>{article.summary}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
