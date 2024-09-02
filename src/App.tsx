import "./App.scss";
import { Accordion } from "./components/accordion/accordion";
import { useAccordionProvider } from "./hooks/use-accordion-provider";

const accordions = [
  {
    title: "Accordion 1",
    content: "Content 1",
  },
  {
    title: "Accordion 2",
    content: "Content 2",
  },
  {
    title: "Accordion 3",
    content:
      "Content 3 </br></br></br></br> Content 3Content 3 </br></br></br></br> Content 3Content 3 </br></br></br></br> Content 3",
  },
];

function App() {
  const accordionProvider = useAccordionProvider();

  return (
    <div className="app">
      <div className="app__actions">
        <button
          onClick={() => accordionProvider.toggle(accordions[0].title, "open")}
        >
          Open First
        </button>
        <button
          onClick={() => accordionProvider.toggle(accordions[0].title, "close")}
        >
          Close First
        </button>
        <button onClick={() => accordionProvider.toggle(accordions[0].title)}>
          Toggle First
        </button>
      </div>

      <Accordion providerValue={accordionProvider}>
        {accordions.map(({ title, content }) => (
          <Accordion.Item key={title} referenceID={title}>
            <Accordion.Header
              title={title}
              prefixIcon={<Accordion.Icon variant="prefix">W</Accordion.Icon>}
              posfixIcon={<Accordion.Icon variant="posfix">X</Accordion.Icon>}
            />
            <Accordion.Content>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </Accordion.Content>
          </Accordion.Item>
        ))}

        <Accordion.Item referenceID="ac5">
          <Accordion.Header
            title="Accordion 4"
            prefixIcon={<Accordion.Icon variant="prefix">W</Accordion.Icon>}
            posfixIcon={<Accordion.Icon variant="posfix">X</Accordion.Icon>}
          />
          <Accordion.Content>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "Content 3 </br></br></br></br> Content 3Content 3 </br></br></br></br> Content 3Content 3 </br></br></br></br> Content 3",
              }}
            />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default App;
