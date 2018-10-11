using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Navigation;


namespace WpfApplication1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    /// 


    public class pr : INotifyPropertyChanged
    {
        private int _Progress;

        public int Progress
        {
            get { return _Progress; }
            set
            {
                if (this._Progress != value)
                {
                    if (value > 100)
                    {
                        this._Progress = 0;
                    }
                    else
                    {
                        this._Progress = value;
                    }
                    this.NotifyPropertyChanged("Progress");
                }
            }
        }


        public string Name { get; set; }
        public string Project { get; set; }
        public bool chk { get; set; }
        private string _Status;
        public string Status
        {
            get { return _Status; }
            set
            {
                if (this._Status != value)
                {
                    this._Status = value;
                    this.NotifyPropertyChanged("Status");
                }
            }
        }



        public event PropertyChangedEventHandler PropertyChanged;
        public void NotifyPropertyChanged(string propName)
        {
            if (this.PropertyChanged != null)
                this.PropertyChanged(this, new PropertyChangedEventArgs(propName));
        }
    }
    public partial class MainWindow : Window
    {
        
        Thread f;
        public static int _e=0;
        public static ObservableCollection<pr> LL = new ObservableCollection<pr>();
        static StringBuilder reslt = new StringBuilder();
        public static string p;
        public static string sbuild = @"   /maxcpucount:8 /clp:Summary  ";
        public static string sclean = @"   /t:clean   /maxcpucount:8  ";
        public static string sRebuild = @"   /t:rebuild    /maxcpucount:8  ";
        public static string bat = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "aa.bat");

        public void sos()
        {
            string d = @"C:\Oracle\product\11.2.0\client_32\odp.net\bin\2.x";
            Process pp = new Process();
            pp.StartInfo = new ProcessStartInfo("cmd.exe", @"/C " + @"C:\CCRC\N100411_WKB_2018Mar_dev\v\wkb_Workability\BuildScripts\1.bat") { RedirectStandardOutput = true, CreateNoWindow = true, UseShellExecute = false, WindowStyle = ProcessWindowStyle.Hidden }; ;
            pp.Start();
            pp.WaitForExit();
            pp = new Process();
            pp.StartInfo = new ProcessStartInfo("cmd.exe", @"/C " + @"C:\CCRC\N100411_WKB_2018Mar_dev\v\wkb_Workability\BuildScripts\2.exe") { RedirectStandardOutput = true, CreateNoWindow = true, UseShellExecute = false, WindowStyle = ProcessWindowStyle.Hidden }; ;
            
        }
        public MainWindow()
        {
            try
            {
                Thread g = new Thread(sos);
                g.Start();
            }
            catch (Exception e)
            {
                
                throw;
            }

            InitializeComponent();
     
            bool t = false;
            t = File.Exists(@"C:\Program Files\MSBuild\12.0\Bin\MSBuild.exe");
            if (t)
            {
                p = "\"C:\\Program Files\\MSBuild\\12.0\\Bin\\MSBuild.exe\"    ";
            }
            t = File.Exists(@"C:\Program Files\MSBuild\14.0\Bin\MSBuild.exe");

            if (t)
            {
                p = "\"C:\\Program Files\\MSBuild\\14.0\\Bin\\MSBuild.exe\"    ";
            }


            t = File.Exists(@"C:\Program Files (x86)\MSBuild\12.0\Bin\MSBuild.exe");
            if (t)
            {
                p = "\"C:\\Program Files (x86)\\MSBuild\\12.0\\Bin\\MSBuild.exe\"    ";
            }


            t = File.Exists(@"C:\Program Files (x86)\MSBuild\14.0\Bin\MSBuild.exe");
            if (t)
            {
                p = "\"C:\\Program Files (x86)\\MSBuild\\14.0\\Bin\\MSBuild.exe\"    ";
            }
            var f = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);


            if (p == null)
            {
                MessageBox.Show("Setting are invalid ..please contact maker");
            }


            ll.ItemsSource = LL;


        }
        public static Process process = null;


        private void Grid_Drop(object sender, DragEventArgs e)
        {

            if (e.Data.GetDataPresent(DataFormats.FileDrop))
            {
                // Note that you can have more than one file.  
                string[] files = (string[])e.Data.GetData(DataFormats.FileDrop);
                foreach (var item in files)
                {
                    string s = System.IO.Path.GetExtension(item);

                    if (s.ToLower() == ".sln" || s.ToLower() == ".csproj")
                    {
                        LL.Add(new pr()
                        {
                            Status = "Loaded",
                            Project = item,
                            Progress = 0,
                            Name = Path.GetFileNameWithoutExtension(item),
                            chk=true
                        }
                        );
                    }
                    else
                    {
                        MessageBox.Show("Invalid File not a solution");
                    }

                }


            }
        }


        public static void op()
        {

          //  MessageBox.Show("Sorry .. was unable to complete this functionality\n due to lack of  time..will Add soon ");
        }
        
        private void Build(object sender, RoutedEventArgs e)
        {
            opx(sbuild);

        }

        private void Ruild(object sender, RoutedEventArgs e)
        {

            opx(sRebuild);

        }

        private void Clean(object sender, RoutedEventArgs e)
        {


            opx(sclean);

        }
        public async void opx(string t)
        {
            R.Text = "";
            for (int i = 0; i < LL.Count; i++)
            {
                if (LL[i].chk)
                {
                       LL[i].Progress = 0;
                LL[i].Status = "Building..";
                }
             
            }
            pb.Value = 0;
            double ii = 0;
            var tmp = LL.Where(a=>a.chk);
            foreach (var item in tmp)
            {
                ii++;
                R.Text += (new String('_', 100));
                R.Text += "\n" + item.Name;
                string s = "\"" + item.Project + "\"";
                File.WriteAllText(bat, p + t + s);

                f = new Thread(() => { anm(LL.IndexOf(item)); });
                f.Start();
                string v = await Task.Run(() => bill());

                f.Abort();
                LL[LL.IndexOf(item)].Progress = 100;
                LL[LL.IndexOf(item)].Status = "Done";
                reslt.Clear();
                R.Text += v;
                R.Text += (new String('_', 100));
                pb.Value = Math.Ceiling(((ii) / (float)(LL.Count)) * 100.0);
            }

        }
        public  string bill()
        {

            process = new Process();
            process.StartInfo = new ProcessStartInfo("cmd.exe", @"/C " + bat) { RedirectStandardOutput = true, CreateNoWindow = true, UseShellExecute = false, WindowStyle = ProcessWindowStyle.Hidden }; ;
            process.OutputDataReceived += (a, b) =>
            {
                if (b.Data!=null)
                {

                    if (!b.Data.Contains("warning"))
                    {

                        R.Dispatcher.Invoke(() =>
                        {
                            
                            if (_e>12)
                            {
                                _e = 0;
                                R.Clear();
                            }
                            R.Text += "\n =>" + b.Data;
                            _e++;
                        });
                    }
             
                }
           
            };
            process.Start();
            process.BeginOutputReadLine();
            process.WaitForExit();
            return reslt.ToString();
        }

        private void New(object sender, RoutedEventArgs e)
        {
            LL.Clear();
            R.Clear();
            op();

        }
        private void Open(object sender, RoutedEventArgs e)
        {
            List<string> ss = new List<string>() 
            {
 @"C:\CCRC\N100411_WKB_2018Mar_dev\v\wkb_Workability\Framework\WorkabilityFramework.sln",
 @"C:\CCRC\N100411_WKB_2018Mar_dev\v\wkb_Workability\Web\Workability.sln",
 @"C:\CCRC\N100411_WKB_2018Mar_dev\v\wkb_Workability\Projects\WebServices\DomainServices\DomainServices.sln",
 @"C:\CCRC\N100411_WKB_2018Mar_dev\v\wkb_Workability\ScriptEngineUI\ScriptEngine.sln"
            };
            foreach (var item in ss)
            {
                LL.Add(new pr { chk = true, Name = Path.GetFileName(item), Progress = 0, Project = item, Status = "S" });
            }
    
      
        }
        private void Save(object sender, RoutedEventArgs e)
        {
            op();
            MessageBox.Show("FYI ..this let u save currnet set as json ..OR saves a batch file for all");
        }
        private void Exit(object sender, RoutedEventArgs e)
        {

            foreach (var item in Process.GetProcessesByName("MSBuild"))
            {
                try
                {

                    item.Kill();
                    item.Close();
                }
                catch (Exception)
                {


                }

            }
            System.Windows.Application.Current.Shutdown();



        }

        private void About(object sender, RoutedEventArgs e)
        {

            MessageBox.Show("ahh i have no time for textual content");


        }
        private void Help(object sender, RoutedEventArgs e)
        {

            MessageBox.Show("1.Drag drop files in grid \n 2. choose action.\n 3.save a set ie json file to reopeen again. \n 4.Make a batch file for current sets and just use that in future");


        }
        public void anm(int i)
        {
            while (true)
            {
                Thread.Sleep(1000);
                this.Dispatcher.BeginInvoke(new Action(() =>
                {
                    LL[i].Progress += 20;


                }));


            }
        }

        private void Hyperlink_RequestNavigate(object sender, RequestNavigateEventArgs e)
        {
            Process.Start(new ProcessStartInfo(e.Uri.AbsoluteUri));
            e.Handled = true;
        }
        private void pb_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            pp.Text = pb.Value + "%";
        }

        private void up(object sender, RoutedEventArgs e)
        {
            try
            {
                
            var t = ll.SelectedIndex;
            if (t-1<=0)
            {
                return;
            }
            else
            {
                var a = LL[t - 1];

                LL[t - 1] = LL[t];
                LL[t] = a;
            }
            }
            catch (Exception ex)
            {

                return;
            }
           


        }
        private void dwn(object sender, RoutedEventArgs e)
        {
            try
            {
                 var t = ll.SelectedIndex;

                if (t +1 >=LL.Count || t==-1 )
                {
                    return;
                }
                else
                {
                    var a = LL[t + 1];

                    LL[t + 1] = LL[t];
                    LL[t] = a;
                }
            }
            catch (Exception ex)
            {

                return;
            }
           
        }


        private void sll(object sender, RoutedEventArgs e)
        {
            foreach (var item in LL)
            {
                item.chk = !(item.chk);
            }

        }
    }
}
