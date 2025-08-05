{
  description = "A basic repl";
  
  deps = pkgs: with pkgs; [
    nodejs-18_x
    nodePackages.typescript-language-server
    nodePackages.yarn
    replitPackages.jest
  ];
}
