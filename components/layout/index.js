const Layout = (props) => {
  return (
    <div className="p-4 border boredr-slate-300 shadow lg:w-[75%] flex lg:justify-center">
      {props.element}
    </div>
  );
};

export default Layout;
