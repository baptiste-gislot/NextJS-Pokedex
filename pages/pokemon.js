import Layout from "../components/Layout";
import Link from "next/link";

const pokemon = ({ pokemon }) => {
  return (
    <Layout title={pokemon.name}>
      <h1 className="text-4xl mb-2 text-center capitalize">{pokemon.name}</h1>
      <img className="mx-auto" src={pokemon.image} alt={pokemon.name} />
      <p>
        <span className="font-bold mr-2">Weight: </span>
        {pokemon.weight * 0.1}
        <span> kg</span>
      </p>
      <p>
        <span className="font-bold mr-2">Height: </span>
        {pokemon.height * 0.1}
      </p>
      <span> m</span>
      <h2 className="text-2xl mt-6 mb-2">Types: </h2>
      {pokemon.types.map((type, index) => {
        return (
          <p className="" key={index}>
            {type.type.name}
          </p>
        );
      })}
      <p className="mt-10 text-center">
        <Link href="/">
          <a className="text-2xl underline">Home</a>
        </Link>
      </p>
    </Layout>
  );
};

// Fetch data on each request and is rendered by server
export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await res.json();
    const paddedIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    pokemon.image = image;
    return {
      props: { pokemon },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default pokemon;
