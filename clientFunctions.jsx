const [apiData, setApiData] = useState([]);
  const [singleDataPiece, setSingleDataPiece] = useState({});

  // \/ GET ALL FUNCTIONS BELOW \/ \\
  // Gets it all and gives it to ya.
  // axiosGetData should be used inside a useEffect
  // when being used for a component. Doesn't 
  // always have to though.
  const axiosGetAllData = async() => {
    await axios.get('http://localhost:9000/api')
    .then(res => {
      const returnedApiData = res.data;
      setApiData(returnedApiData);
    })
  }
  // ||   Should be used for the initial get all
  // \/ upon loading the display screen.
  useEffect(() => {
    axiosGetAllData();
  }, []);
  // /\ GET ALL FUNCTIONS ABOVE /\ \\

  // \/ GET ONE FUNCTION BELOW \/ \\
  const axiosGetOneItem = async(id) => {
    await axios.get(`http://localhost:9000/getOne/${id}`)
    .then((res) => setSingleDataPiece(res.data));
  }
  // /\ GET ONE FUNCTION ABOVE /\ \\

  // \/ DELETE FUNCTION BELOW \/ \\
  // Currently uses id for deletion but can easily be changed,
  // speak to me if you would like to alter that.
  const axiosDeleteData = async(id) => {
    await axios.delete(`http://localhost:9000/deleteItem/${id}`);
  }
  // /\ DELETE FUNCTION ABOVE /\ \\

  // \/ DELETE FUNCTION BELOW \/ \\
  // You should build up a new version of the object that you'd like to change
  // along with it's CORRECT ID, the same one it already has in the json file.
  // Feed that object in as the argument.
  const axiosUpdateItem = async(updateObject) => {
    await axios.put(`http://localhost:9000/updateOne`, updateObject)
  }
  // /\ UPDATE FUNCTION ABOVE /\ \\