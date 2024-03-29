import { motion } from "framer-motion";
import { CreateActivityStyled } from "./CreateActivityStyled";
import { HashLink } from "react-router-hash-link";
import { BlobStyled } from "../../styles/BlobStyled.js";

import CreatingForm from "./CreatingForm";

export default function CreateActivity() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CreateActivityStyled>
        <h1>What kind of unique ideas boredom brings you?</h1>
        <BlobStyled
          style={{
            "--height":"500px" ,
            "--width": "500px",
            "--top": "20%",
            "--right": "30%",
          }}
          plop={true}
        />
        <CreatingForm />
        <HashLink to="/#create-display" className="link__go-back">
          go back
        </HashLink>
      </CreateActivityStyled>
    </motion.div>
  );
}
