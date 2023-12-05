import DOMPurify from "dompurify";

export const OompaLoompaDescription = ({ description }) => {
  const safeDescription = DOMPurify.sanitize(description);

  return (
    <div
      className="oompaLoompa-description"
      dangerouslySetInnerHTML={{ __html: safeDescription }}
    />
  );
};
