const Avatar = {
  get: (params) => {
    let bg = "2d2e3e";
    let color = "fee600";
    return `https://ui-avatars.com/api/?name=${params.name}&uppercase=true&background=${bg}&color=${color}&bold=true&length=2`;
  },
};

export default Avatar;
