import FZF from "assets/logos/404.png";

export function Loading() {
  return <div> Loading</div>;
}
export function Forbidden() {
  return <div> Forbidden</div>;
}
export function PageNotFound() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${FZF})`,
        backgroundPosition: "center" /* Center the image */,
        backgroundRepeat: "no-repeat" /* Do not repeat the image */,
        backgroundSize: "contain",
        backgroundColor: "white",
      }}
    />
  );
}
