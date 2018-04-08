 Criação da tabela em banco SQL Server, através do Migration

Definir servidor, base, usuario e senha no arquivo "Config/DbConfig.cs" do projeto "Model".

Executar no Package Manager Console, o comando Update-Database apontando para a configuracao acima.

Será aplicado o migration "Initial"

** Se preferir, há um backup "Library.bak" com a tabela na raiz da solution.


No Package mmanager console executar o comando "dotnet restore" e o comando "npm install force".
