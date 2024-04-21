import React, { useEffect, useState } from "react";
import axios from "axios";
import { Constant } from "./Constant";
import { ImageFilter } from "./ImageFilter";
import { Loader } from "./Loader";
import { ErrorPage } from "./ErrorPage";
import Close from "./images/close.png";

interface IModalType {
  id?: string;
  title?: string;
  summary?: string;
  fullText?: string;
  isOpen: boolean;
  toggleModal: () => void;
}

export default function Modal(props: IModalType) {
  const [details, setDetails] = React.useState<IModalType | null>(null);

  const [isLoading, setIsLoading]: [boolean, (isLoading: boolean) => void] =
    useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] =
    useState<string>("");

  //to remove body scroll & move to top when the modal opens
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = props.isOpen ? "hidden" : "unset";
  }, [props.isOpen]);

  //API request for detailed articles
  useEffect(() => {
    const getFullSummary = async () => {
      try {
        let { data } = await axios.get(`${Constant.ARTICLE_URL}/${props.id}`);
        setDetails(data);
        setError("");
      } catch (err: any) {
        let error =
          err.response.status === 404
            ? Constant.ERROR_NO_RES
            : Constant.UNEXP_ERROR;
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getFullSummary();

    return () => {
      setDetails(null);
      setError("");
      setIsLoading(true);
    };
  }, [props.id]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && props.isOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <span id="close">
              <ImageFilter
                src={Close}
                alt="Close"
                onClick={props.toggleModal}
              />
            </span>
            {error && <ErrorPage error={error} />}
            {details && (
              <>
                <h4>{details.title}</h4>
                <hr />
                <p className="modal-content" style={{ fontStyle: "italic" }}>
                  {details.summary}
                </p>
                <p className="modal-content">{details.fullText}</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
