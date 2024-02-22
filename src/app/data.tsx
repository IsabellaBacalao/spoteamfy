import React from 'react';

interface DataRow {
  id: number;
  type: string;
  animal: string;
  description: string;
  imageURL: string;
}

interface DataProps {
  id?: number; 
}

const Data: React.FC<DataProps> = ({ id }) => {
  const data: DataRow[] = [
    {
        id: 1,
        type: 'Dynamique & Vivant',
        animal: 'Lion',
        description: 'Roi de la jungle, le lion symbolise la force et l\'énergie, avec son rugissement puissant qui pourrait évoquer la loudness et la vitalité de ce cluster.',
        imageURL: 'https://images.pexels.com/photos/36843/lion-panthera-leo-lioness-animal-world.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 2,
        type: 'Rythmique & Énergique',
        animal: 'Cheval',
        description: 'Rapide et puissant, le cheval reflète le tempo élevé et l\'énergie, incarnant la vivacité et la puissance de ce groupe de chansons.',
        imageURL: 'https://images.pexels.com/photos/6215840/pexels-photo-6215840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 3,
        type: 'Acoustique & Instrumental',
        animal: 'Rossignol',
        description: 'Cet oiseau est connu pour ses mélodies complexes et son chant mélodieux, ce qui correspond bien à l\'acousticité et l\'instrumentalité, ainsi qu\'à la présence subtile de "liveness" dans ce cluster.',
        imageURL: 'https://images.pexels.com/photos/6482734/pexels-photo-6482734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    }, 
    { 
        id: 4, 
        type: "Doux & Mélodieux", 
        animal: "Dauphin", 
        description: "Les dauphins sont connus pour leurs sons doux et leur nature joueuse, associés à la danceabilité, l'acousticité, et la sensation de légèreté.", 
        imageURL: 'https://images.pexels.com/photos/1986374/pexels-photo-1986374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    { 
        id: 5, 
        type: "Dynamique & Joyeux", 
        animal: "Perroquet", 
        description: "Coloré et énergique, capable de reproduire des sons joyeux, reflétant la loudness, la danceabilité, et la valence positive.",
        imageURL: 'https://images.pexels.com/photos/6796549/pexels-photo-6796549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
     },
    { 
        id: 6, 
        type: "Rythmique & Technique", 
        animal: "Pieuvre", 
        description: "Connue pour sa capacité à manipuler plusieurs objets simultanément, symbolise la complexité technique et la précision rythmique.",
        imageURL: 'https://images.pexels.com/photos/5986729/pexels-photo-5986729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    {   
        id: 7, 
        type: "Expressif & Naturel", 
        animal: "Baleine à bosse", 
        description: "Les chants des baleines sont mystérieux et émotionnellement expressifs, avec une profondeur naturelle et une richesse acoustique représentant l'acousticité, la liveness, et la speechiness.",
        imageURL: 'https://images.pexels.com/photos/3309869/pexels-photo-3309869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
  ];

  const filteredData = id ? data.filter((row) => row.id === id) : data;

  return (
    <>
      {filteredData.map((row) => (
        <div key={row.id} className="data-item flex flex-col items-center">
          <img className="rounded-full h-48 w-48 mb-4" src={row.imageURL} alt={row.animal} />
          <h2 className="font-bold text-xl mb-2">{row.animal}</h2>
          <h2 className="font-semibold text-sm">{row.type}</h2>
          <p>{row.description}</p>
        </div>
      ))}
    </>
  );
};

export default Data;