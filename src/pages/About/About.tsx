import { useContext } from "react";
import "./About.scss";

import NFT1 from "../../assets/aboutImg/NFT1.png";
import NFT2 from "../../assets/aboutImg/NFT2.png";
import NFT3 from "../../assets/aboutImg/NFT3.png";
import NFT4 from "../../assets/aboutImg/NFT4.png";

import { LanguageContext } from "../../context/LanguageContext";

const About = () => {
  // language context
  const { isEnglish, english, korean } = useContext(LanguageContext);
  var language = isEnglish ? english : korean;
  const text = language.about;

  const Paragraph = ({ content }) => {
    return (
      <div className="content">
        &nbsp;&nbsp;{content}
      </div>
    )
  }

  return (
    <div className="home-box">
      <div className="home-box__content">
        <h1 style={{marginTop: '20px'}}>{text.title}</h1>
        <h3 style={{marginTop: '15px'}}>{text.subTitle}</h3>
        &nbsp;&nbsp;{text.abstract}

        <div className="box">
          <div className="subTitle">
            <h3>{text.inspiration}</h3>
          </div>
          <Paragraph content={text.inspirationContent} />
        </div>

        <div className="box">
          <div className="subTitle">
            <h3>{text.web3}</h3>
          </div>
          <Paragraph content={text.web3Content} />
        </div>

        <div className="box">
          <div className="subTitle">
            <h3>{text.sns}</h3>
          </div>
          <Paragraph content={text.snsContent} />
          <Paragraph content={text.snsContent2} />
        </div>

        <div className="box">
          <div className="subTitle">
            <h3>{text.socialToken}</h3>
          </div>
          <Paragraph content={text.socialTokenContent} />
          <Paragraph content={text.socialTokenContent2} />
          {text.socialTokenExample.map((str, i) => {
            return <div key={i}>{str}</div>;
          })}
          {text.socialTokenContent3}
          <Paragraph content={text.socialTokenContent4} />
        </div>

        <div className="box">
          <div className="subTitle">
            <h3>{text.nft}</h3>
          </div>
          <div className="imgContainer">
            <img alt="NFT1" src={NFT1} style={{flex: 1}} />
            <img alt="NFT2" src={NFT2} style={{flex: 1}} />
            <img alt="NFT3" src={NFT3} style={{flex: 1}} />
            <img alt="NFT4" src={NFT4} style={{flex: 1}} />
          </div>
          <Paragraph content={text.nftContent} />
          {text.nftExample.map((obj, i) => {
            return (
              <div style={{marginTop: '5px'}} key={i}>
                &nbsp;&nbsp;{i+1}. {obj.title}
                <br />
                &nbsp;&nbsp;- {obj.content}
              </div>
            );
          })}
        </div>

        <div className="box">
          <div className="subTitle">
            <h3>{text.future}</h3>
          </div>
          <Paragraph content={text.futureContent} />
          <Paragraph content={text.futureContent2} />
          <Paragraph content={text.futureContent3} />
        </div>
      </div>
    </div>
  );
};
export default About;
