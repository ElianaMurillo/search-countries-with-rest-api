/*interface DropDownProps {
  regions: string[];
  showDropDown: boolean;
  regionSelection: Function;
  toggleDropDown: Function;
};

const DropDown: React.FC<DropDownProps> = ({
  regions,
  regionSelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const onClickHandler = (region: string): void => {
    regionSelection(region);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return(
    <>
      <div>
        {regions.map(
          (region: string, index: number): JSX.Element => {
            return(
              <p key={index} onClick={(): void =>{
                onClickHandler(region);
              }}>
                {region}
              </p>
            );
          }
        )}
      </div>
    </>
  );
};
export default DropDown;*/
